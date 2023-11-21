import {
  Alert,
  Button,
  Input,
  Spinner,
  Tab,
  Tabs,
  TabsHeader
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import PsychologistList from "components/PsychologistList";
import { useFetching } from "hooks/useFetching";
import { usePsychologists } from "hooks/usePsychologists";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Psychologists = ({ type }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [filter, setFilter] = useState({
    query: "",
    filter: "",
  });

  const searchAndFilterPsychologists = usePsychologists(
    psychologists,
    filter.query,
    filter.filter
  );

  const {
    fetching: fetchPsycho,
    isLoading: isPsychoLoading,
    error: psychoError,
    errorOpen: open,
  } = useFetching(async () => {
    const response = await AdminService.getPsychologists();
    setPsychologists(response.data);
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

  const deletePsychologist = async (id) => {
    try {
      await AdminService.deletePsychologistById(id);
      fetchPsycho();
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
    fetchPsycho();
    fetchSpec();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={open || specErrorOpen || errorOpen}
      >
        {psychoError || specError || error}
      </Alert>
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Психологи
      </div>
      <div className="flex justify-between items-center">
        <div className="min-w-[300px]">
          <Input
            placeholder="Поиск"
            variant="static"
            className="text-xl placeholder-shown:border-gray-200 min-w-full"
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            crossOrigin={undefined}
          />
        </div>
        <Link to="/addPsychologist">
          <Button
            variant="text"
            className="rounded-none text-black text-sm ml-5"
          >
            Добавить
          </Button>
        </Link>
      </div>
      <Tabs value={filter.filter} className="w-full mt-5">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          <Tab value="" onClick={() => setFilter({ ...filter, filter: "" })}>
            &nbsp;&nbsp;ВСЕ&nbsp;&nbsp;
          </Tab>
          {specializations &&
            specializations.map((specialization) => (
              <Tab
                key={specialization.id}
                value={specialization.name}
                className="uppercase"
                onClick={() =>
                  setFilter({ ...filter, filter: specialization.name })
                }
              >
                &nbsp;&nbsp;{specialization.name}&nbsp;&nbsp;
              </Tab>
            ))}
        </TabsHeader>
      </Tabs>
      {isPsychoLoading || isSpecLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <PsychologistList
          psychologists={searchAndFilterPsychologists}
          type={type}
          deletePsychologist={deletePsychologist}
        />
      )}
    </div>
  );
};

export default Psychologists;
