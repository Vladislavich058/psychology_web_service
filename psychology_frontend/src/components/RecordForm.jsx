import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import ClientService from "API/ClientService";
import dateFormat from "dateformat";
import { useFetching } from "hooks/useFetching";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useForm } from "react-hook-form";
import { usePDF } from "react-to-pdf";
import { getPrice } from "utils/getPrice";
import RecordPDF from "./RecordPDF";

const RecordForm = ({
  openDialog,
  handleOpenDialog,
  psychologist = null,
  type,
}) => {
  const [record, setRecord] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    duration: type === "psychologist" ? "01:00" : "",
    price: null,
    psychologistPrice: null,
    office: null,
  });
  const [times, setTimes] = useState([]);
  const [offices, setOffices] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "record.pdf" });
  const [responseRecord, setResponseRecord] = useState({});
  const [openPDF, setOpenPDF] = useState(false);
  const [specialization, setSpecialization] = useState({
    label: "",
    price: "",
  });

  const specializations = [
    {
      label: "Индивидуальные занятия",
      price: record.office && record.office.priceIndividual,
    },
    {
      label: "Групповые занятия",
      price: record.office && record.office.priceGroup,
    },
  ];

  const {
    fetching: fetchData,
    isLaoding: isDataLoading,
    error: dataError,
    errorOpen: dataErrorOpen,
    setErrorOpen: setDataErrorOpen,
  } = useFetching(async () => {
    let response;
    if (type === "psychologist") {
      response = await ClientService.getFreeTimes(psychologist.id, record.date);
      setTimes(response.data);
    } else {
      response = await ClientService.getFreeOffices(
        record.date,
        record.time,
        record.duration
      );
      setOffices(response.data);
    }
  });

  const {
    fetching: fetchAdd,
    isLaoding: isAddLoading,
    error: addError,
    errorOpen: addErrorOpen,
  } = useFetching(async () => {
    const res = await ClientService.addRecord({ record });
    setResponseRecord(res.data);
    setOpenPDF(true);
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const handleChange = (event) => {
    setRecord({
      ...record,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeTime = (value) => {
    setRecord({
      ...record,
      time: value,
    });
  };

  const handleChangeDate = (value) => {
    setRecord({
      ...record,
      date: dateFormat(value, "yyyy-mm-dd"),
    });
  };

  const handleChangeOffice = (value) => {
    setRecord({
      ...record,
      office: value,
    });
  };

  const handleChangePrice = (value) => {
    setRecord({
      ...record,
      price: value.price,
      psychologistPrice: value,
    });
  };

  const handleChangeOfficePrice = (value) => {
    setRecord({
      ...record,
      price: value.price,
    });
  };

  const handleAdd = () => {
    fetchAdd();
  };

  useEffect(
    () => {
      if (
        !errors.date &&
        !errors.time &&
        !errors.duration &&
        ((type === "psychologist" && record.date) ||
          (type === "office" && record.date && record.time && record.duration))
      ) {
        setSpecialization(null);
        setDataErrorOpen(false);
        fetchData();
        if (type === "psychologist") {
          handleChangeTime("");
        } else {
          setRecord({
            ...record,
            office: null,
          });
        }
        setOpenPDF(false);
        setResponseRecord({});
      }
    },
    type === "office"
      ? [record.time, record.duration, record.date, openDialog]
      : [record.date, openDialog]
  );

  return isDataLoading || isAddLoading ? (
    <div className="flex justify-center mt-12">
      <Spinner />
    </div>
  ) : (
    <Dialog
      open={openDialog}
      handler={handleOpenDialog}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="p-2"
      size="xs"
    >
      {" "}
      {openPDF ? (
        <RecordPDF
          toPDF={toPDF}
          record={responseRecord}
          targetRef={targetRef}
          type={type}
        />
      ) : (
        <div>
          {" "}
          <DialogHeader className="flex justify-center text-3xl">
            Запись {type === "psychologist" ? "к специалисту" : "в офис"}
          </DialogHeader>
          <DialogBody className="text-xl text-black">
            {type === "psychologist" ? (
              <div>
                <span className="font-medium">Специалист:</span>{" "}
                {psychologist && psychologist.surname}{" "}
                {psychologist && psychologist.name}{" "}
                {psychologist && psychologist.lastname}
              </div>
            ) : (
              ""
            )}
            <form
              className="mt-2 flex flex-col gap-4"
              onSubmit={(e) => handleSubmit(handleAdd)(e)}
            >
              <div className="flex flex-col gap-3.5">
                <Input
                  placeholder="Ваше имя"
                  variant="static"
                  className="text-xl !text-black"
                  name="name"
                  value={record.name}
                  {...register("name", {
                    required: "Заполните поле!",
                    pattern: {
                      value: /^[A-Za-zА-Яа-яЁё]+$/,
                      message: "Имя должно содержать только буквы!",
                    },
                  })}
                  error={errors?.name ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-red-500 text-lg -mt-2">
                  {errors?.name && (
                    <p>{errors?.name?.message.toString() || "Ошибка ввода!"}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <Input
                  placeholder="Ваш телефон"
                  variant="static"
                  className="text-xl !text-black"
                  name="phone"
                  value={record.phone}
                  {...register("phone", {
                    required: "Заполните поле!",
                    pattern: {
                      value: /^(80|\+375)(\(?(29|44|25|33)\)?)[\d]{7}$/,
                      message: "Неверный формат номера телефона!",
                    },
                  })}
                  error={errors?.phone ? true : false}
                  crossOrigin={undefined}
                  onChange={(e) => handleChange(e)}
                />
                <div className=" text-red-500 text-lg -mt-2">
                  {errors?.phone && (
                    <p>
                      {errors?.phone?.message.toString() || "Ошибка ввода!"}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xl font-medium">Выберите дату</div>
                <div className="border-b-[1px] py-2 border-blue-gray-200">
                  <DatePicker
                    filterDate={(current) => {
                      return moment(current).day() !== 0;
                    }}
                    name="date"
                    value={record.date}
                    minDate={new Date()}
                    onChange={(value) => handleChangeDate(value)}
                  />
                </div>
              </div>
              {type === "psychologist" &&
              record.date &&
              times.length &&
              !dataErrorOpen ? (
                <div>
                  <div className="text-xl font-medium">Выберите время</div>
                  <Select
                    size="lg"
                    variant="static"
                    name="time"
                    className="text-lg uppercase text-black"
                    value={record.time}
                    onChange={(value) => handleChangeTime(value)}
                  >
                    {times.map((time) => (
                      <Option
                        key={time}
                        value={time}
                        className="uppercase text-lg text-black"
                      >
                        {time.substring(0, 5)}
                      </Option>
                    ))}
                  </Select>
                </div>
              ) : type === "psychologist" &&
                record.date &&
                !isDataLoading &&
                !times.length &&
                !dataErrorOpen ? (
                <div className="text-red-500 text-lg">
                  На данную дату свободных записей нет:{`(`}
                </div>
              ) : (
                ""
              )}
              {type === "office" ? (
                <div>
                  <div className="text-xl font-medium">Выберите время</div>
                  <div className="flex flex-col gap-3.5">
                    <Input
                      variant="static"
                      className="text-xl !text-black"
                      type="time"
                      name="time"
                      value={record.time}
                      {...register("time", {
                        required: "Заполните поле!",
                        min: {
                          value: "09:00",
                          message: "Офис работает с 9:00",
                        },
                        max: {
                          value: "20:00",
                          message: "Офис работает до 21:00",
                        },
                      })}
                      error={errors?.time ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className=" text-red-500 text-lg -mt-2">
                      {errors?.time && (
                        <p>
                          {errors?.time?.message.toString() || "Ошибка ввода!"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-xl font-medium mt-3">
                    Выберите продолжительность
                  </div>
                  <div className="flex flex-col gap-3.5">
                    <Input
                      variant="static"
                      className="text-xl !text-black"
                      type="time"
                      name="duration"
                      value={record.duration}
                      {...register("duration", {
                        required: "Заполните поле!",
                        min: {
                          value: "01:00",
                          message: "Минимальное время брони 1 ч",
                        },
                        max: {
                          value: "12:00",
                          message: "Максимальное время брони 12 ч",
                        },
                      })}
                      error={errors?.duration ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className=" text-red-500 text-lg -mt-2">
                      {errors?.duration && (
                        <p>
                          {errors?.duration?.message.toString() ||
                            "Ошибка ввода!"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {type === "office" &&
              record.date &&
              record.time &&
              record.duration &&
              !dataErrorOpen &&
              offices.length ? (
                <div>
                  <div className="text-xl font-medium">Выберите офис</div>
                  <Select
                    size="lg"
                    variant="static"
                    name="office"
                    className="text-lg uppercase text-black font-montserrat"
                    onChange={(value) => handleChangeOffice(value)}
                  >
                    {offices.map((office) => (
                      <Option
                        key={office.id}
                        value={office}
                        className="uppercase text-lg text-black font-montserrat"
                      >
                        {office.number}
                      </Option>
                    ))}
                  </Select>
                </div>
              ) : type === "office" &&
                record.date &&
                record.time &&
                record.duration &&
                !dataErrorOpen &&
                !isDataLoading&&
                !offices.length ? (
                <div className="text-red-500 text-lg">
                  Свободные офисы отсутствуют:{`(`}
                </div>
              ) : (
                ""
              )}
              {type === "psychologist" && record.time ? (
                <div>
                  <div className="text-xl font-medium">
                    Выберите специализацию
                  </div>
                  <Select
                    size="lg"
                    variant="static"
                    className="text-lg uppercase text-black"
                    name="specialization"
                    value={record.psychologistPrice}
                    onChange={(value) => handleChangePrice(value)}
                  >
                    {psychologist.psychologistPrices.map(
                      (psychologistPrice) => (
                        <Option
                          key={psychologistPrice.id}
                          value={psychologistPrice}
                          className="uppercase text-lg text-black"
                        >
                          {psychologistPrice.specialization.name}
                        </Option>
                      )
                    )}
                  </Select>
                  <div className="flex justify-end mt-5">
                    <div>
                      Стоимость:{" "}
                      <span className="font-montserrat font-medium">
                        {getPrice(record.price)} BYN
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {type === "office" && record.office ? (
                <div>
                  <div className="text-xl font-medium">
                    Выберите тип занятий
                  </div>
                  <Select
                    size="lg"
                    variant="static"
                    className="text-lg uppercase text-black"
                    name="specialization"
                    // @ts-ignore
                    value={specialization}
                    onChange={(value) => {
                      handleChangeOfficePrice(value);
                    }}
                  >
                    {specializations.map((specialization) => (
                      <Option
                        key={specialization.label}
                        // @ts-ignore
                        value={specialization}
                        className="uppercase text-lg text-black"
                      >
                        {specialization.label}
                      </Option>
                    ))}
                  </Select>
                  <div className="flex justify-end mt-5">
                    <div>
                      Стоимость:{" "}
                      <span className="font-montserrat font-medium">
                        {getPrice(record.price)} BYN
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <Button
                variant="outlined"
                className="rounded-none text-black text-sm py-2"
                fullWidth
                type="submit"
                disabled={
                  !isValid ||
                  !record.date ||
                  !record.price ||
                  !record.time ||
                  dataErrorOpen
                }
              >
                Записаться
              </Button>
            </form>
            <Alert
              className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
              open={dataErrorOpen || addErrorOpen}
            >
              {dataError || addError}
            </Alert>
          </DialogBody>
        </div>
      )}
    </Dialog>
  );
};

export default RecordForm;
