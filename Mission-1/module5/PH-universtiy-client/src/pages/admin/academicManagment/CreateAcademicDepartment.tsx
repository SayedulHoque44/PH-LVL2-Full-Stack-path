import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment, { isLoading }] =
    useAddAcademicDepartmentMutation();
  const { data: fData } = useGetAllAcademicFacultiesQuery(undefined, {
    skip: isLoading,
  });

  const AFacultyOptions = fData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  console.log(fData);

  const onSubmit: SubmitHandler<FieldValues> = async (ADepartmentData) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addAcademicDepartment(
        ADepartmentData
      )) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Department created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}>
          <PHInput name="name" label="Department Name" type="text" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            disabled={isLoading}
            options={AFacultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
