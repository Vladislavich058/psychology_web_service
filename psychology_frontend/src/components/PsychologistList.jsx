import React from "react";
import PsychologistItem from "./PsychologistItem";

const PsychologistList = ({ psychologists, type, deletePsychologist }) => {
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
