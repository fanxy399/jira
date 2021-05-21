import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESRT";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  data?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { data: newPresent } = action;
  switch (action.type) {
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [...future, present],
      };
    case REDO:
      if (past.length === 0) return state;
      const next = future[0];
      const newFutrue = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFutrue,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback(
    <T>(newPresent: T) => dispatch({ type: SET, data: newPresent }),
    []
  );
  const reset = useCallback(
    <T>(newPresent: T) => dispatch({ type: RESET, data: newPresent }),
    []
  );

  return [state, { canRedo, canUndo, undo, redo, set, reset }] as const;
};
