import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import { useFetching } from "hooks/useFetching";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getPrice } from "utils/getPrice";

const PsychologistForm = ({ specializations, offices, type }) => {
  const params = useParams();
  const [psychologist, setPsychologist] = useState({
    id: null,
    name: "",
    surname: "",
    lastname: "",
    description: "",
    office: offices[0],
    psychologistPrices: [],
    schedule: {
      mondayStartTime: null,
      mondayEndTime: null,
      tuesdayStartTime: null,
      tuesdayEndTime: null,
      wensdayStartTime: null,
      wensdayEndTime: null,
      thusdayStartTime: null,
      thusdayEndTime: null,
      fridayStartTime: null,
      fridayEndTime: null,
      saturdayStartTime: null,
      saturdayEndTime: null,
    },
  });
  const [psychologistPrice, setPsychologistPrice] = useState({
    price: null,
    specialization: specializations[0],
  });
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [errorTime, setErrorTime] = useState("");
  const times = [
    {
      label: "Пн",
      valueStart: psychologist.schedule.mondayStartTime,
      valueEnd: psychologist.schedule.mondayEndTime,
      nameStart: "mondayStartTime",
      nameEnd: "mondayEndTime",
    },
    {
      label: "Вт",
      valueStart: psychologist.schedule.tuesdayStartTime,
      valueEnd: psychologist.schedule.tuesdayEndTime,
      nameStart: "tuesdayStartTime",
      nameEnd: "tuesdayEndTime",
    },
    {
      label: "Ср",
      valueStart: psychologist.schedule.wensdayStartTime,
      valueEnd: psychologist.schedule.wensdayEndTime,
      nameStart: "wensdayStartTime",
      nameEnd: "wensdayEndTime",
    },
    {
      label: "Чт",
      valueStart: psychologist.schedule.thusdayStartTime,
      valueEnd: psychologist.schedule.thusdayEndTime,
      nameStart: "thusdayStartTime",
      nameEnd: "thusdayEndTime",
    },
    {
      label: "Пт",
      valueStart: psychologist.schedule.fridayStartTime,
      valueEnd: psychologist.schedule.fridayEndTime,
      nameStart: "fridayStartTime",
      nameEnd: "fridayEndTime",
    },
    {
      label: "Сб",
      valueStart: psychologist.schedule.saturdayStartTime,
      valueEnd: psychologist.schedule.saturdayEndTime,
      nameStart: "saturdayStartTime",
      nameEnd: "saturdayEndTime",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: type === "edit" ? "onSubmit" : "onBlur",
  });

  const router = useNavigate();

  const {
    register: registerPrice,
    handleSubmit: handleSubmitPrice,
    reset: resetPrice,
    formState: { errors: errorsPrice, isValid: isValidPrice },
  } = useForm({
    mode: "onBlur",
  });

  const {
    fetching: fetchAdd,
    isLaoding: isAddLoading,
    error: addError,
    errorOpen: addErrorOpen,
  } = useFetching(async () => {
    let formData = new FormData();
    formData.append(
      "psychologist",
      new Blob([JSON.stringify(psychologist)], {
        type: "application/json",
      })
    );
    for (const key of Object.keys(photos)) {
      formData.append("photos", photos[key]);
    }
    if (type === "edit") {
      await AdminService.editPsychologist(formData);
    } else {
      await AdminService.addPsychologist(formData);
    }
    router("/psychologists");
  });

  const {
    fetching: fetchPsycho,
    isLaoding: isPsychoLoading,
    error: psychoError,
    errorOpen: psychoErrorOpen,
  } = useFetching(async () => {
    const response = await AdminService.getPsychologistById(params.id);
    setPsychologist(response.data);
    reset();
  });

  useEffect(() => {
    if (type === "edit") {
      fetchPsycho();
    }
  }, []);

  const checkPsychologistPrice = () => {
    for (let i = 0; i < psychologist.psychologistPrices.length - 1; i++) {
      if (
        psychologist.psychologistPrices[i].specialization.id ===
        psychologist.psychologistPrices[i + 1].specialization.id
      ) {
        return false;
      }
    }
    return true;
  };

  const checkTimeInterval = () => {
    const schedule = psychologist.schedule;
    if (
      !checkInterval(schedule.mondayStartTime, schedule.mondayEndTime) ||
      !checkInterval(schedule.tuesdayStartTime, schedule.tuesdayEndTime) ||
      !checkInterval(schedule.wensdayStartTime, schedule.wensdayEndTime) ||
      !checkInterval(schedule.thusdayStartTime, schedule.thusdayEndTime) ||
      !checkInterval(schedule.fridayStartTime, schedule.fridayEndTime) ||
      !checkInterval(schedule.saturdayStartTime, schedule.saturdayEndTime)
    ) {
      return false;
    }
    return true;
  };

  const checkInterval = (startInterval, endInterval) => {
    if (
      (startInterval !== null && endInterval === null) ||
      (startInterval === null && endInterval !== null)
    ) {
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!checkPsychologistPrice()) {
      setError("Специализации не могут повторяться!");
    } else if (!checkTimeInterval()) {
      setErrorTime("Если вы начали заполнять интервал, то закончите до конца!");
    } else {
      fetchAdd();
    }
  };

  const handleChange = (event) => {
    setPsychologist({
      ...psychologist,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeOffice = (value) => {
    setPsychologist({ ...psychologist, office: value });
  };

  const handleChangePrice = (event) => {
    setPsychologistPrice({
      ...psychologistPrice,
      price: event.target.value,
    });
  };

  const handleChangeSpecialization = (value) => {
    setPsychologistPrice({
      ...psychologistPrice,
      specialization: value,
    });
  };

  const handleChangePhotos = (event) => {
    setPhotos(event.target.files);
  };

  const handleChangeSchedule = (event) => {
    const schedule = {
      ...psychologist.schedule,
      [event.target.name]: event.target.value,
    };
    setPsychologist({ ...psychologist, schedule: schedule });
  };

  const addPsychologistPrice = () => {
    psychologist.psychologistPrices.push(psychologistPrice);
    resetPrice();
    setError("");
  };

  const removePsychologistPrice = (index) => {
    psychologist.psychologistPrices.splice(index, 1);
    resetPrice();
    setError("");
  };

  return (
    <div className="p-5">
      {isAddLoading || isPsychoLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <Alert
            className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
            open={addErrorOpen || psychoErrorOpen}
          >
            {addError || psychoError}
          </Alert>
          <div className="text-center uppercase font-medium text-3xl mb-10">
            {type === "edit" ? "Редактирование" : "Добавление"} психолога
          </div>
          <div className="flex justify-around mt-5">
            <div className="">
              <form className="mb-2 text-black">
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    placeholder="Имя"
                    variant="static"
                    className="text-xl !text-black"
                    name="name"
                    value={psychologist.name}
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
                      <p>
                        {errors?.name?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    placeholder="Фамилия"
                    variant="static"
                    className="text-xl !text-black"
                    name="surname"
                    value={psychologist.surname}
                    {...register("surname", {
                      required: "Заполните поле!",
                      pattern: {
                        value: /^[A-Za-zА-Яа-яЁё]+$/,
                        message: "Фамилия должна содержать только буквы!",
                      },
                    })}
                    error={errors?.surname ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className=" text-red-500 text-lg -mt-2">
                    {errors?.surname && (
                      <p>
                        {errors?.surname?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Input
                    placeholder="Отчество"
                    variant="static"
                    className="text-xl !text-black"
                    name="lastname"
                    value={psychologist.lastname}
                    {...register("lastname", {
                      pattern: {
                        value: /^[A-Za-zА-Яа-яЁё]*$/,
                        message: "Отчество должно содержать только буквы!",
                      },
                    })}
                    error={errors?.lastname ? true : false}
                    crossOrigin={undefined}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className=" text-red-500 text-lg -mt-2">
                    {errors?.lastname && (
                      <p>
                        {errors?.lastname?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <Textarea
                    placeholder="Описание"
                    variant="static"
                    className="text-xl !text-black"
                    name="description"
                    value={psychologist.description}
                    {...register("description", {
                      required: "Заполните поле!",
                    })}
                    error={errors?.description ? true : false}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className=" text-red-500 text-lg -mt-2">
                    {errors?.description && (
                      <p>
                        {errors?.description?.message.toString() ||
                          "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-3.5">
                  <div>
                    <div className="text-xl">Фото</div>
                    <Input
                      size="lg"
                      variant="static"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      multiple
                      {...register("photos", {
                        required: "Выберите фото!",
                      })}
                      error={errors?.photos ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => handleChangePhotos(e)}
                    />
                  </div>
                  <div className=" text-red-500 text-lg -mt-2">
                    {errors?.photos && (
                      <p>
                        {errors?.photos?.message.toString() || "Ошибка ввода!"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xl">Любимый офис</div>
                  <Select
                    size="lg"
                    variant="static"
                    name="office"
                    className="text-black"
                    value={psychologist.office}
                    onChange={(e) => handleChangeOffice(e)}
                  >
                    {offices.map((office) => (
                      <Option key={office.id} value={office}>
                        <span className="font-montserrat">{office.number}</span>
                      </Option>
                    ))}
                  </Select>
                </div>
              </form>
              <form
                className="mb-3 text-black"
                onSubmit={(e) => handleSubmitPrice(addPsychologistPrice)(e)}
              >
                <div className="text-xl">Специализация</div>
                <div className="flex items-center justify-around gap-5">
                  <Select
                    size="lg"
                    variant="static"
                    name="specialization"
                    className="text-lg uppercase text-black w-[250px]"
                    value={psychologistPrice.specialization}
                    onChange={(e) => handleChangeSpecialization(e)}
                  >
                    {specializations.map((specialization) => (
                      <Option
                        key={specialization.id}
                        value={specialization}
                        className="uppercase text-base"
                      >
                        {specialization.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="max-w-[200px]">
                    <Input
                      placeholder="Стоимость в копейках"
                      variant="static"
                      className="text-lg !font-montserrat text-black"
                      type="number"
                      name="price"
                      value={psychologistPrice.price}
                      min="1"
                      {...registerPrice("price", {
                        required: "Заполните поле!",
                        min: {
                          value: 1,
                          message: "Минимальное значение 1",
                        },
                      })}
                      error={errorsPrice?.price ? true : false}
                      crossOrigin={undefined}
                      onChange={(e) => handleChangePrice(e)}
                    />
                  </div>
                  <IconButton
                    variant="text"
                    type="submit"
                    disabled={!isValidPrice}
                  >
                    <PlusIcon strokeWidth={2} className="h-4 w-4 text-black" />
                  </IconButton>
                </div>
                <div className=" text-red-500 text-lg mt-2">
                  {(errorsPrice?.price || error) && (
                    <p>
                      {errorsPrice?.price?.message.toString() ||
                        error ||
                        "Ошибка ввода!"}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  {psychologist.psychologistPrices.length
                    ? psychologist.psychologistPrices.map(
                        (psychologistPrice, index) => (
                          <div className="text-black flex items-center gap-3">
                            <span className="uppercase">
                              {psychologistPrice.specialization.name}
                            </span>
                            <div>
                              <span className="font-montserrat">
                                {getPrice(psychologistPrice.price)}
                              </span>{" "}
                              BYN
                            </div>
                            <IconButton
                              variant="text"
                              onClick={() => removePsychologistPrice(index)}
                            >
                              <MinusIcon
                                strokeWidth={2}
                                className="h-4 w-4 text-black"
                              />
                            </IconButton>
                          </div>
                        )
                      )
                    : ""}
                </div>
              </form>
            </div>
            <div className="text-black">
              <div className="text-2xl mb-5 font-medium">Расписание</div>
              {times.map(
                (
                  { label, valueStart, valueEnd, nameStart, nameEnd },
                  index
                ) => (
                  <div className="flex gap-2 items-end" key={index}>
                    <div>{label}:</div>
                    <div>
                      <Input
                        size="lg"
                        variant="static"
                        type="time"
                        value={valueStart}
                        className="!font-montserrat !text-black"
                        name={nameStart}
                        crossOrigin={undefined}
                        onChange={(e) => handleChangeSchedule(e)}
                      />
                    </div>
                    <div className="font-montserrat">-</div>
                    <div>
                      <Input
                        size="lg"
                        variant="static"
                        type="time"
                        value={valueEnd}
                        className="!font-montserrat !text-black"
                        name={nameEnd}
                        crossOrigin={undefined}
                        onChange={(e) => handleChangeSchedule(e)}
                      />
                    </div>
                  </div>
                )
              )}
              <div className=" text-red-500 text-lg mt-2">
                {errorTime ? <p>{errorTime}</p> : ""}
              </div>
              <Button
                variant="outlined"
                className="rounded-none mt-10 text-black text-sm py-2"
                fullWidth
                onClick={() => handleSubmit(handleAdd)()}
                disabled={
                  type === "edit"
                    ? psychologist.psychologistPrices.length === 0
                    : !isValid || psychologist.psychologistPrices.length === 0
                }
              >
                {type === "edit" ? "Редактировать" : "Добавить"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistForm;
