import PHFileUploader from "@/components/Form/PHFileUploder";
import PHForm from "@/components/Form/PHForm";
import PHInput from "@/components/Form/PHInput";
import PHModal from "@/components/shared/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const SpecialtyModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [createSpecialty, { isLoading }] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("Specialty created successfully!!");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button disabled={isLoading} sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtyModal;
