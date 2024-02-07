import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicDepartmentSearchableFields } from "./academicDepartment.constant";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

// createAcademicDepartmentIntoDB
const createAcademicDepartmentIntoDB = async (paylode: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(paylode);
  return result;
};
// getAllAcademicDepartmeFromDB
const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartmentModel.find().populate("academicFaculty"),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {
    meta,
    result,
  };
};
// getAcademicDepartmentById
const getAcademicDepartmentById = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};
// getAcademicDepartmentById
const updateAcademicDepartmentById = async (
  id: string,
  paylode: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, paylode);
  return result;
};

// services
export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentById,
  getAllAcademicDepartmentFromDB,
  updateAcademicDepartmentById,
};
