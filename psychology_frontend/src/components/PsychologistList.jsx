import React, { useState } from "react";
import PsychologistItem from "./PsychologistItem";
import RecordForm from "./RecordForm";

const PsychologistList = ({
  psychologists,
  type = "",
  deletePsychologist = null,
}) => {
  return (
    <div className="flex flex-wrap justify-around">
      {psychologists &&
        psychologists.map((psychologist) => (
          <PsychologistItem
            key={psychologist.id}
            psychologist={psychologist}
            type={type}
            deletePsychologist={deletePsychologist}
          />
        ))}
    </div>
  );
};

export default PsychologistList;
