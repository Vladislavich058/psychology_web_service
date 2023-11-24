import { Button } from "@material-tailwind/react";
import React from "react";
import { getPrice } from "utils/getPrice";

const RecordPDF = ({ record, targetRef, type, toPDF, ...props }) => {
  return (
    <div>
      <div {...props} ref={targetRef} className="text-xl p-10">
        <div className="text-3xl mb-5">
          Запись {type === "psychologist" ? "к специалисту" : "в офис"}
        </div>
        {type === "psychologist" ? (
          <div>
            <span className="font-medium">Специалист:</span>{" "}
            {record.psychologistPrice &&
              record.psychologistPrice.psychologist.surname}{" "}
            {record.psychologistPrice &&
              record.psychologistPrice.psychologist.name}{" "}
            {record.psychologistPrice &&
              record.psychologistPrice.psychologist.lastname}
          </div>
        ) : (
          ""
        )}
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Ваше имя: </span>
            {record.name}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Ваш телефон: </span>
            {record.phone}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Дата: </span>
            {record.date}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Время: </span>
            {record.time.substring(0, 5)}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Продолжительность: </span>
            {record.duration.substring(0, 5)}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Кабинет: </span>
            <span className=" font-montserrat">
              № {record.office && record.office.number}
            </span>
          </div>
        </div>
        {type === "psychologist" ? (
          <div className="mt-2 flex flex-col gap-4">
            <div>
              <span className="font-medium">Специализация: </span>
              {record.psychologistPrice &&
                record.psychologistPrice.specialization.name}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <span className="font-medium">Стоимость: </span>
            <span className="font-montserrat">
              {getPrice(record.price)} BYN
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        className="rounded-none text-black text-sm py-2"
        fullWidth
        onClick={() => toPDF()}
      >
        Скачать
      </Button>
    </div>
  );
};

export default RecordPDF;
