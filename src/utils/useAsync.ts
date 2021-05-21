import { useState, useCallback, useReducer } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  stat: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const config = { ...defaultConfig, ...initialConfig };
  const [reTry, setReTry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => safeDispatch({ data, stat: "success", error: null }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) => safeDispatch({ error, data: null, stat: "error" }),
    [safeDispatch]
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setReTry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((res) => {
          setData(res);
          return res;
        })
        .catch((err) => {
          setError(err);
          if (config.throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );
  return {
    isIdle: state.stat === "idle",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    run,
    reTry,
    setData,
    setError,
    ...state,
  };
};
