import React from "react";
import OfficeItem from "./OfficeItem";

const OfficeList = ({ offices, type = "" }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {offices &&
        offices.map((office) => (
          <OfficeItem key={office.id} office={office} type={type} />
        ))}
    </div>
  );
};

export default OfficeList;
