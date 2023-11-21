import { Button } from "@material-tailwind/react";
import React from "react";

const SpecializationItem = ({
  specialization,
  deleteSpecialization,
  classes,
}) => {
  return (
    <tr>
      <td className={classes}>{specialization.name}</td>
      <td className={classes}>
        <Button
          variant="outlined"
          className="rounded-none text-black"
          size="sm"
          onClick={() => deleteSpecialization(specialization.id)}
        >
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default SpecializationItem;
