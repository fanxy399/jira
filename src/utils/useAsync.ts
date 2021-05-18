import { useState, useCallback } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  const config = { ...defaultConfig, ...initialConfig };
  const [reTry, setReTry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => setState({ data, stat: "success", error: null }),
    []
  );
  const setError = useCallback(
    (error: Error) => setState({ error, data: null, stat: "error" }),
    []
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { reTry: () => Promise<D> }) => {
      if (!promise || !promise.then) throw new Error("请传入 Promise 类型数据");
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      setReTry(() => () => {
        if (runConfig?.reTry) {
          run(runConfig?.reTry(), runConfig);
        }
      });
      return promise
        .then((res) => {
          if (mountedRef.current) setData(res);
          return res;
        })
        .catch((err) => {
          setError(err);
          if (config.throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
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
