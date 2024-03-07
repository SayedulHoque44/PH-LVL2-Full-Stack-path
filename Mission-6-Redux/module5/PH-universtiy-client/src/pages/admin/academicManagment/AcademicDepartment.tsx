import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicSemester, "name">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentsQuery([
    { name: "sort", value: "createdAt" },
    ...params,
  ]);

  console.log(facultyData);
  const tableData = facultyData?.data?.map(
    ({ name, _id, createdAt }, index: number) => ({
      key: _id,
      index: index + 1,
      name,
      createdAt,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "No",
      key: "index",
      dataIndex: "index",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      {isLoading && <>Loading....</>}
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </>
  );
};

export default AcademicDepartment;
