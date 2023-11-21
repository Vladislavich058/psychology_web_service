import { Alert, Button, Input, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import { useFetching } from "hooks/useFetching";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SpecializationForm = ({
  setOpenSpecializationDialog,
  fetchSpecializations,
}) => {
  const [specialization, setSpecialization] = useState({
    name: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const {
    fetching: fetchAdd,
    isLaoding: isAddLoading,
    error: addError,
    errorOpen: addErrorOpen,
  } = useFetching(async () => {
    await AdminService.addSpecialization({ specialization });
    setOpenSpecializationDialog(false);
    fetchSpecializations();
  });

  const handleAdd = async (event) => {
    fetchAdd();
  };

  const handleChange = (event) => {
    setSpecialization({
      ...specialization,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {isAddLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="text-center text-2xl font-semibold text-black">Добавление специализации</div>
          <form
            className="mt-4 mb-2"
            onSubmit={(e) => {
              handleSubmit(handleAdd)(e);
            }}
          >
            <div className="mb-1 flex flex-col gap-3.5">
              <Input
                placeholder="Название"
                variant="static"
                className="text-xl"
                name="name"
                value={specialization.name}
                {...register("name", {
                  required: "Заполните поле!",
                  pattern: {
                    value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                    message: "Название должно содержать только буквы!",
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
            <Button
              variant="outlined"
              className="rounded-none mt-10 text-black text-sm py-2"
              fullWidth
              type="submit"
              disabled={!isValid}
            >
              Добавить
            </Button>
            <Alert
              className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
              open={addErrorOpen}
            >
              {addError}
            </Alert>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpecializationForm;
