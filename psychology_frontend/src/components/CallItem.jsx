import { Button } from "@material-tailwind/react";
import React from "react";

const CallItem = ({ call, callBack, classes }) => {
  return (
    <tr>
      <td className={classes}>{call.name}</td>
      <td className={classes + " font-montserrat text-base"}>{call.phone}</td>
      <td className={classes}>
        {call.isCallBack ? (
          ""
        ) : (
          <Button
            variant="outlined"
            className="rounded-none text-black"
            size="sm"
            onClick={() => callBack(call.id)}
          >
            Перезвонить
          </Button>
        )}
      </td>
    </tr>
  );
};

export default CallItem;
