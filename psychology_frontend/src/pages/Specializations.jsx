import { Alert, Input, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import SpecializationDialog from "components/SpecializationDialog";
import SpecializationTable from "components/SpecializationTable";
import { useFetching } from "hooks/useFetching";
import { useSpecializations } from "hooks/useSpecializations";
import React, { useEffect, useState } from "react";

const Specializations = () => {
  const [specializations, setSpecializations] = useState();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);

  const searchSpecializations = useSpecializations(specializations, query);

  const {
    fetching: fetchSpec,
    isLoading: isSpecLoading,
    error: specError,
    errorOpen: specErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getSpecializations();
    setSpecializations(response.data);
  });

  const deleteSpecialization = async (id) => {
    try {
      await AdminService.deleteSpecializationById(id);
      fetchSpec();
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
    fetchSpec();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={specErrorOpen || errorOpen}
      >
        {specError || error}
      </Alert>
      {isSpecLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <SpecializationTable
            searchSpecializations={searchSpecializations}
            deleteSpecialization={deleteSpecialization}
            query={query}
            setQuery={setQuery}
            setOpenDialog={setOpenDialog}
          />
          <SpecializationDialog
            openSpecializationDialog={openDialog}
            handleOpenDialog={handleOpenDialog}
            setOpenSpecializationDialog={setOpenDialog}
            fetchSpecializations={fetchSpec}
          />
        </div>
      )}
    </div>
  );
};

export default Specializations;
