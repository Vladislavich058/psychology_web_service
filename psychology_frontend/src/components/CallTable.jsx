import { Input } from "@material-tailwind/react";
import React from "react";
import CallItem from "./CallItem";

const CallTable = ({ calls, callBack, query, setQuery }) => {
  const TABLE_HEAD = ["Имя клиента", "Телефон клиента", ""];
  return (
    <div className="mt-10 max-w-xl h-full">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Звонки
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[300px]">
          <Input
            placeholder="Поиск"
            variant="static"
            className="text-xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            crossOrigin={undefined}
          />
        </div>
      </div>
      <table className="w-full table-auto text-center mt-10">
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
          {calls &&
            calls.map((call, index) => {
              const isLast = index === calls.length - 1;
              const classes = isLast
                ? "px-8 py-4"
                : "px-8 py-4 border-b border-blue-gray-50";

              return (
                <CallItem
                  key={index}
                  call={call}
                  classes={classes}
                  callBack={callBack}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CallTable;
