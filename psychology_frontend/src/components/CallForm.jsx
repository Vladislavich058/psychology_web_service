import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Spinner,
} from "@material-tailwind/react";
import ClientService from "API/ClientService";
import { useFetching } from "hooks/useFetching";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const CallForm = ({ openDialog, handleOpenDialog, setOpenDialog }) => {
  const [call, setCall] = useState({
    name: "",
    phone: "",
  });

  const {
    fetching: fetchCall,
    isLaoding: isCallLoading,
    error: callError,
    errorOpen: callErrorOpen,
  } = useFetching(async () => {
    await ClientService.addCall({ call });
    setOpenDialog(false);
    reset();
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const handleChange = (event) => {
    setCall({
      ...call,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = () => {
    fetchCall();
  };

  return isCallLoading ? (
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
      <div>
        {" "}
        <DialogHeader className="flex justify-center text-3xl">
          Заказать обратный звонок
        </DialogHeader>
        <DialogBody className="text-xl text-black">
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
                  <p>{errors?.phone?.message.toString() || "Ошибка ввода!"}</p>
                )}
              </div>
            </div>
            <Button
              variant="outlined"
              className="rounded-none text-black text-sm py-2"
              fullWidth
              type="submit"
              disabled={!isValid}
            >
              Отправить
            </Button>
          </form>
          <Alert
            className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
            open={callErrorOpen}
          >
            {callError}
          </Alert>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default CallForm;
