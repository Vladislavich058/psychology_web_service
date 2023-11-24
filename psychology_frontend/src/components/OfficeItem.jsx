import {
  Card,
  CardBody,
  CardHeader,
  Carousel,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import { getPrice } from "utils/getPrice";

const OfficeItem = ({ office, type = "" }) => {
  const prices = [
    {
      label: "Индивидуальное занятие",
      price: office.priceIndividual,
    },
    {
      label: "Групповое занятие",
      price: office.priceGroup,
    },
    {
      label: "Индивидуальное занятие(>10 часов)",
      price: office.priceIndividualLong,
    },
    {
      label: "Групповое занятие(>10 часов)",
      price: office.priceGroupLong,
    },
  ];

  return (
    <Card className="w-[400px] my-5">
      <CardHeader floated={false}>
        {office.photos.length > 1 ? (
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
            {office.photos.map((photo) => (
              <img
                key={photo.name}
                src={photo.uri}
                alt={photo.name}
                className="h-[250px] w-[400px] object-cover overflow-hidden object-center"
              />
            ))}
          </Carousel>
        ) : (
          <h1 className="p-5">Нет фото</h1>
        )}
      </CardHeader>
      <CardBody>
        <div className="text-xl text-black font-semibold">
          Офис №{office.number}
        </div>
        <div className="text-lg py-1">{office.description}</div>
        <div className="text-lg py-1">
          <span className="font-montserrat text-sm">{office.square} </span> м2
        </div>
        <Tooltip
          content={prices.map(({ label, price }) => (
            <div className="py-1 text-sm font-montserrat">
              <span className="uppercase">{label}</span>-
              <span>{getPrice(price)}</span> BYN
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
          content={
            <div className="py-1 text-sm">
              <span className="uppercase">ПН-СБ:</span>{" "}
              <span className="font-montserrat">
                {office.schedule &&
                  office.schedule.mondayStartTime.substring(0, 5)}
                -
                {office.schedule &&
                  office.schedule.mondayEndTime.substring(0, 5)}
              </span>
            </div>
          }
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
      </CardBody>
    </Card>
  );
};

export default OfficeItem;
