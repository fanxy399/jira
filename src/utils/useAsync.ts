import { useState } from "react";

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
  const config = { ...defaultConfig, ...initialConfig };
  const setData = (data: D) => setState({ data, stat: "success", error: null });
  const setError = (error: Error) =>
    setState({ error, data: null, stat: "error" });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) throw new Error("请传入 Promise 类型数据");
    setState({ ...state, stat: "loading" });
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
  };
  return {
    isIdle: state.stat === "idle",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    run,
    setData,
    setError,
    ...state,
  };
};
