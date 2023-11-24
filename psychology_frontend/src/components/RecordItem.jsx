import { Button } from "@material-tailwind/react";
import React from "react";
import { getPrice } from "utils/getPrice";

const RecordItem = ({ record, deleteRecord, classes }) => {
  return (
    <tr>
      <td className={classes}>{record.name}</td>
      <td className={classes + " font-montserrat text-base"}>{record.phone}</td>
      <td className={classes + " font-montserrat text-base"}>
        {new Date(Date.parse(record.date)).toLocaleDateString("en-US")}
      </td>
      <td className={classes + " font-montserrat text-base"}>
        {record.time.substring(0,5)}
      </td>
      <td className={classes + " font-montserrat text-base"}>
        {record.duration.substring(0,5)}
      </td>
      <td className={classes}>
        {record.psychologistPrice &&
          record.psychologistPrice.psychologist &&
          record.psychologistPrice.psychologist.surname}{" "}
        {record.psychologistPrice &&
          record.psychologistPrice.psychologist &&
          record.psychologistPrice.psychologist.name}{" "}
        {record.psychologistPrice &&
          record.psychologistPrice.psychologist &&
          record.psychologistPrice.psychologist.lastname}
      </td>
      <td className={classes + " font-montserrat text-base"}>{record.office.number}</td>
      <td className={classes + " font-montserrat text-base"}>{getPrice(record.price)}</td>
      <td className={classes}>
        <Button
          variant="outlined"
          className="rounded-none text-black"
          size="sm"
          onClick={() => deleteRecord(record.id)}
        >
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default RecordItem;
