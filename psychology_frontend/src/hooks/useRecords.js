import { useMemo } from "react";

export const useSortedRecords = (records, sort) => {
  const sortedRecords = useMemo(() => {
    if (sort.value) {
      if (sort.type === "asc") {
        if (sort.value === "price") {
          return [...records].sort((a, b) => a[sort.value] - b[sort.value]);
        }
        return [...records].sort((a, b) =>
          a[sort.value].localeCompare(b[sort.value])
        );
      }
      if (sort.value === "price") {
        return [...records].sort((a, b) => b[sort.value] - a[sort.value]);
      }
      return [...records].sort((a, b) =>
        b[sort.value].localeCompare(a[sort.value])
      );
    }
    return records;
  }, [sort, records]);
  return sortedRecords;
};

export const useSortedAndSerachedRecords = (records, sort, query) => {
  const sortedRecords = useSortedRecords(records, sort);
  const sortedAndSearchedRecords = useMemo(() => {
    if (query) {
      return sortedRecords.filter(
        (record) =>
          (record.name &&
            record.name.toLowerCase().includes(query.toLowerCase())) ||
          (record.phone &&
            record.phone.toLowerCase().includes(query.toLowerCase())) ||
          (record.psychologistPrice &&
            (
              record.psychologistPrice.psychologist.surname +
              " " +
              record.psychologistPrice.psychologist.name +
              " " +
              record.psychologistPrice.psychologist.lastname
            )
              .toLowerCase()
              .includes(query.toLowerCase()))
      );
    }
    return sortedRecords;
  }, [query, sortedRecords]);

  return sortedAndSearchedRecords;
};

export const useRecords = (records, sort, query, filter) => {
  const sortedAndSearchedRecords = useSortedAndSerachedRecords(
    records,
    sort,
    query
  );
  const sortedAndSearchedAndFilteredRecords = useMemo(() => {
    if (filter.startDate && filter.endDate) {
      const startDate = new Date(filter.startDate);
      const endDate = new Date(filter.endDate);
      return sortedAndSearchedRecords.filter(
        (record) =>
          new Date(record.date) >= startDate && new Date(record.date) <= endDate
      );
    }
    return sortedAndSearchedRecords;
  }, [filter, sortedAndSearchedRecords]);
  return sortedAndSearchedAndFilteredRecords;
};
