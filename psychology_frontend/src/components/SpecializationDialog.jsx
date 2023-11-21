import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import SpecializationForm from "./SpecializationForm";

const SpecializationDialog = ({
  openSpecializationDialog,
  handleOpenDialog,
  setOpenSpecializationDialog,
  fetchSpecializations,
}) => {
  return (
    <Dialog
      open={openSpecializationDialog}
      handler={handleOpenDialog}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
    >
      <DialogBody>
        <SpecializationForm
          setOpenSpecializationDialog={setOpenSpecializationDialog}
          fetchSpecializations={fetchSpecializations}
        />
      </DialogBody>
    </Dialog>
  );
};

export default SpecializationDialog;
