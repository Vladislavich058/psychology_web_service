import { IconButton, Input, Option, Select } from "@material-tailwind/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import React from "react";
import RecordItem from "./RecordItem";

const RecordTable = ({ records, deleteRecord, filter, setFilter }) => {
  const TABLE_HEAD = [
    "Имя клиента",
    "Телефон клиента",
    "Дата",
    "Время",
    "Продолжительность",
    "Специалист",
    "Номер офиса",
    "Стоимость, BYN",
    "",
  ];

  const sorts = [
    { label: "Без сортировки", value: "" },
    { label: "По дате", value: "date" },
    { label: "По продолжительности", value: "duration" },
    { label: "По стоимости", value: "price" },
  ];
  return (
    <div className="mt-10 w-full h-full">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Записи
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[300px]">
          <Input
            placeholder="Поиск"
            variant="static"
            className="text-xl"
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            crossOrigin={undefined}
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-end gap-2">
            <div>От:</div>
            <Input
              variant="static"
              type="date"
              className="text-base !font-montserrat"
              value={filter.filter.startDate}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  filter: { ...filter.filter, startDate: e.target.value },
                })
              }
              crossOrigin={undefined}
            />
          </div>
          <div className="flex items-end gap-2">
            <div>До:</div>
            <Input
              variant="static"
              type="date"
              className="text-base !font-montserrat"
              value={filter.filter.endDate}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  filter: { ...filter.filter, endDate: e.target.value },
                })
              }
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="w-[250px]">
            <Select
              variant="static"
              className="text-xl text-black"
              value={filter.sort.value}
              onChange={(value) =>
                setFilter({ ...filter, sort: { ...filter.sort, value: value } })
              }
            >
              {sorts.map((sort) => (
                <Option
                  key={sort.label}
                  value={sort.value}
                  className="text-xl text-black"
                >
                  {sort.label}
                </Option>
              ))}
            </Select>
          </div>
          <IconButton
            variant="text"
            onClick={() =>
              filter.sort.type === "asc"
                ? setFilter({
                    ...filter,
                    sort: { ...filter.sort, type: "desc" },
                  })
                : setFilter({
                    ...filter,
                    sort: { ...filter.sort, type: "asc" },
                  })
            }
          >
            <AdjustmentsHorizontalIcon strokeWidth={2} className="h-6 w-6" />
          </IconButton>
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
          {records &&
            records.map((record, index) => {
              const isLast = index === records.length - 1;
              const classes = isLast
                ? "px-0 py-4"
                : "px-8 py-4 border-b border-blue-gray-50";

              return (
                <RecordItem
                  key={index}
                  record={record}
                  classes={classes}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
