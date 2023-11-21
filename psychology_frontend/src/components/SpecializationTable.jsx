import { Button, Input } from "@material-tailwind/react";
import React from "react";
import SpecializationItem from "./SpecializationItem";

const SpecializationTable = ({
  searchSpecializations,
  deleteSpecialization,
  query,
  setQuery,
  setOpenDialog,
}) => {
  const TABLE_HEAD = ["Название", ""];

  return (
    <div className="mt-10 max-w-2xl">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Специализации
      </div>
      <div className="flex justify-between items-center">
        <div className="max-w-xs">
          <Input
            placeholder="Поиск"
            variant="static"
            className="text-xl placeholder-shown:border-gray-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            crossOrigin={undefined}
          />
        </div>
        <Button
          variant="text"
          className="rounded-none text-black ml-5 text-sm"
          onClick={() => setOpenDialog(true)}
        >
         Добавить
        </Button>
      </div>
      <table className="w-full table-auto text-left mt-10">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 px-8 py-4"
              >
                <div className="font-normal leading-none opacity-70">
                  {head}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchSpecializations &&
            searchSpecializations.map((spec, index) => {
              const isLast = index === searchSpecializations.length - 1;
              const classes = isLast
                ? "px-8 py-4 uppercase text-base"
                : "px-8 py-4 border-b border-blue-gray-50 uppercase text-base";

              return (
                <SpecializationItem
                  key={index}
                  specialization={spec}
                  classes={classes}
                  deleteSpecialization={deleteSpecialization}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SpecializationTable;
