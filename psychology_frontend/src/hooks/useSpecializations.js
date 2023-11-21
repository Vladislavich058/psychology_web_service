import { useMemo } from "react";

export const useSpecializations = (specializations, query) => {
  const searchSpecializations = useMemo(() => {
    if (query) {
      return specializations.filter((spec) =>
        spec.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return specializations;
  }, [query, specializations]);
  return searchSpecializations;
};
