import { useMemo } from "react";

export const useSerachPsychologists = (psychologists, query) => {
  const searchPsychologists = useMemo(() => {
    if (query) {
      return psychologists.filter(
        (psychologist) =>
          psychologist.name.toLowerCase().includes(query.toLowerCase()) ||
          psychologist.surname.toLowerCase().includes(query.toLowerCase()) ||
          psychologist.lastname.toLowerCase().includes(query.toLowerCase()) ||
          (
            psychologist.surname.toLowerCase() +
            " " +
            psychologist.name.toLowerCase() +
            " " +
            psychologist.lastname.toLowerCase()
          ).includes(query.toLowerCase())
      );
    }
    return psychologists;
  }, [query, psychologists]);
  return searchPsychologists;
};

export const usePsychologists = (psychologists, query, filter) => {
  const searchPsychologists = useSerachPsychologists(psychologists, query);
  const searchAndFilterPsychologists = useMemo(() => {
    if (filter) {
      const filters = searchPsychologists.filter((psychologist) =>
        psychologist.psychologistPrices
          .map((psychologistPrice) =>
            psychologistPrice.specialization.name.toLowerCase()
          )
          .includes(filter.toLowerCase())
      );
      return filters;
    }
    return searchPsychologists;
  }, [filter, searchPsychologists]);
  return searchAndFilterPsychologists;
};
