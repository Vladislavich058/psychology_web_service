import { useMemo } from "react";

export const useCalls = (calls, query) => {
  const searchCalls = useMemo(() => {
    if (query) {
      return calls.filter(
        (call) =>
          call.name.toLowerCase().includes(query.toLowerCase()) ||
          call.phone.toLowerCase().includes(query.toLowerCase())
      );
    }
    return calls;
  }, [query, calls]);
  return searchCalls;
};
