import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import ChartAnalitic from "components/ChartAnalitic";
import dateFormat from "dateformat";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";

const Analitics = () => {
  const [analitics, setAnalitics] = useState([]);
  const [date, setDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));

  const {
    fetching: fetchAnalitic,
    isLoading: isAnaliticLoading,
    error: analiticError,
    errorOpen: analiticErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getAnalitic(date);
    setAnalitics(response.data);
  });

  useEffect(() => {
    fetchAnalitic();
  }, [date]);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={analiticErrorOpen}
      >
        {analiticError}
      </Alert>
      {isAnaliticLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <ChartAnalitic analitics={analitics} setDate={setDate} date={date}/>
        </div>
      )}
    </div>
  );
};

export default Analitics;
