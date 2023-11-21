import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import PsychologistForm from "components/PsychologistForm";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";

const PsychologistAddPage = ({type = ""}) => {
  const [offices, setOffices] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const {
    fetching: fetchOffices,
    isLaoding: isOfficeLoading,
    error: officeError,
    errorOpen: officeErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getOffices();
    setOffices(response.data);
  });
  const {
    fetching: fetchSpec,
    isLoading: isSpecLoading,
    error: specError,
    errorOpen: specErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getSpecializations();
    setSpecializations(response.data);
  });

  useEffect(() => {
    fetchOffices();
    fetchSpec();
  }, []);

  return isOfficeLoading || isSpecLoading ? (
    <div className="flex justify-center mt-12">
      <Spinner />
    </div>
  ) : (
    <div className="py-10">
      <PsychologistForm specializations={specializations} offices={offices} type={type} />
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={officeErrorOpen || specErrorOpen}
      >
        {officeError || specError}
      </Alert>
    </div>
  );
};

export default PsychologistAddPage;
