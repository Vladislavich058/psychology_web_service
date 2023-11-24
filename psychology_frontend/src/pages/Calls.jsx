import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import CallTable from "components/CallTable";
import SpecializationDialog from "components/SpecializationDialog";
import SpecializationTable from "components/SpecializationTable";
import { useCalls } from "hooks/useCalls";
import { useFetching } from "hooks/useFetching";
import { useSpecializations } from "hooks/useSpecializations";
import React, { useEffect, useState } from "react";

const Calls = () => {
  const [calls, setCalls] = useState();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const searchCalls = useCalls(calls, query);

  const {
    fetching: fetchCalls,
    isLoading: isCallsLoading,
    error: callsError,
    errorOpen: callsErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getCalls();
    setCalls(response.data);
  });

  const callBack = async (id) => {
    try {
      await AdminService.callBackById(id);
      fetchCalls();
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
    fetchCalls();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={callsErrorOpen || errorOpen}
      >
        {callsError || error}
      </Alert>
      {isCallsLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <CallTable
            calls={searchCalls}
            callBack={callBack}
            query={query}
            setQuery={setQuery}
          />
        </div>
      )}
    </div>
  );
};

export default Calls;
