import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import RecordTable from "components/RecordTable";
import { useFetching } from "hooks/useFetching";
import { useRecords } from "hooks/useRecords";
import React, { useEffect, useState } from "react";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({
    sort: { value: "", type: "asc" },
    query: "",
    filter: { startDate: "", endDate: "" },
  });
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const sortedAndSearchedAndFilteredRecords = useRecords(
    records,
    filter.sort,
    filter.query,
    filter.filter
  );

  const {
    fetching: fetchRecords,
    isLoading: isRecordsLoading,
    error: recordsError,
    errorOpen: recordsErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getRecords();
    setRecords(response.data);
  });

  const deleteRecord = async (id) => {
    try {
      await AdminService.deleteRecordById(id);
      fetchRecords();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={recordsErrorOpen || errorOpen}
      >
        {recordsError || error}
      </Alert>
      {isRecordsLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <RecordTable
            records={sortedAndSearchedAndFilteredRecords}
            deleteRecord={deleteRecord}
            setFilter={setFilter}
            filter={filter}
          />
        </div>
      )}
    </div>
  );
};

export default Records;
