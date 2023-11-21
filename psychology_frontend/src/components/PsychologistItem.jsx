import {
  Card,
  CardBody,
  CardHeader,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getPrice } from "utils/getPrice";
import { Tooltip } from "@material-tailwind/react";
import { UserMinusIcon, PencilIcon } from "@heroicons/react/24/solid";

const PsychologistItem = ({ psychologist, type, deletePsychologist }) => {
  const times = [
    {
      label: "Пн",
      valueStart:
        psychologist.schedule && psychologist.schedule.mondayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.mondayEndTime,
    },
    {
      label: "Вт",
      valueStart:
        psychologist.schedule && psychologist.schedule.tuesdayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.tuesdayEndTime,
    },
    {
      label: "Ср",
      valueStart:
        psychologist.schedule && psychologist.schedule.wensdayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.wensdayEndTime,
    },
    {
      label: "Чт",
      valueStart:
        psychologist.schedule && psychologist.schedule.thusdayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.thusdayEndTime,
    },
    {
      label: "Пт",
      valueStart:
        psychologist.schedule && psychologist.schedule.fridayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.fridayEndTime,
    },
    {
      label: "Сб",
      valueStart:
        psychologist.schedule && psychologist.schedule.saturdayStartTime,
      valueEnd: psychologist.schedule && psychologist.schedule.saturdayEndTime,
    },
  ];
  const router = useNavigate();
  return (
    <Card className="w-[300px] my-5">
      <CardHeader floated={false}>
        {psychologist.photos.length > 1 ? (
          <Carousel
            className="rounded-t-xl"
            navigation={() => ""}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {psychologist.photos.map((photo) => (
              <img
                key={photo.name}
                src={photo.uri}
                alt={photo.name}
                className="h-[250px] w-[300px] object-cover overflow-hidden object-center"
              />
            ))}
          </Carousel>
        ) : psychologist.photos.length === 1 ? (
          <img
            key={psychologist.photos[0].name}
            src={psychologist.photos[0].uri}
            alt={psychologist.photos[0].name}
            className="h-[250px] w-[300px] object-cover overflow-hidden object-center"
          />
        ) : (
          <h1 className="p-5">Нет фото</h1>
        )}
      </CardHeader>
      <CardBody>
        <div className="text-xl text-black font-semibold">
          {psychologist.surname} {psychologist.name} {psychologist.lastname}
        </div>
        <div className="text-lg py-1">{psychologist.description}</div>
        {type === "admin" ? (
          <div className="py-1 text-lg">
            <span className="font-montserrat">
              {psychologist.office.number}
            </span>{" "}
            кабинет
          </div>
        ) : (
          ""
        )}
        <Tooltip
          content={psychologist.psychologistPrices.map((psychologistPrice) => (
            <div className="py-1 text-sm">
              <span className="uppercase">
                {psychologistPrice.specialization.name}
              </span>{" "}
              -{" "}
              <span className="font-montserrat">
                {getPrice(psychologistPrice.price)}
              </span>{" "}
              BYN
            </div>
          ))}
          className="bg-gray-100 text-black"
          animate={{
            mount: { scale: 1, x: 0 },
            unmount: { scale: 0, x: 35 },
          }}
        >
          <div className="cursor-pointer flex justify-end items-center text-sm">
            Стоимость услуг
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 cursor-pointer text-gray-500 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
        </Tooltip>
        <Tooltip
          content={times.map(({ label, valueStart, valueEnd }) => {
            return (
              <div className="py-1 text-sm">
                <span className="uppercase">{label}:</span>{" "}
                <span className="font-montserrat">
                  {valueStart ? valueStart.substring(0,5) : "выходной"}
                  {valueStart ? "-" : ""}
                  {valueEnd ? valueEnd.substring(0,5) : ""}
                </span>
              </div>
            );
          })}
          className="bg-gray-100 text-black"
          animate={{
            mount: { scale: 1, x: 0 },
            unmount: { scale: 0, x: 35 },
          }}
        >
          <div className="cursor-pointer flex justify-end items-center text-sm">
            Расписание
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4 cursor-pointer text-gray-500 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
        </Tooltip>
        {type === "admin" ? (
          <div className="flex items-center justify-between">
            <Tooltip content="Изменить">
              <IconButton variant="text" onClick={() => router(`/editPsychologist/${psychologist.id}`)}>
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content="Удалить">
              <IconButton
                variant="text"
                onClick={() => deletePsychologist(psychologist.id)}
              >
                <UserMinusIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default PsychologistItem;
