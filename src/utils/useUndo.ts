import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setstate] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  const undo = useCallback(() => {
    setstate((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const newPresent = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: newPresent,
        future: [...future, present],
      };
    });
  }, []);
  const redo = useCallback(() => {
    setstate((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const newPresent = future[0];
      const newFutrue = future.slice(1);
      return {
        past: [...past, present],
        present: newPresent,
        future: newFutrue,
      };
    });
  }, []);
  const set = useCallback((newPresent: T) => {
    setstate((currentState) => {
      const { past, present } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  const reset = useCallback((newPresent: T) => {
    setstate((currentState) => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { canRedo, canUndo, undo, redo, set, reset }] as const;
};
