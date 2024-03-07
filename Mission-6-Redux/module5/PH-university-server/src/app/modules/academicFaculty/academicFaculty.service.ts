import QueryBuilder from "../../builder/QueryBuilder";
import { TAcademicFaculty } from "./academicFaculty.Interface";
import { AcademicFacultyModel } from "./academicFaculty.Model";
import { AcademicFacultySearchableFields } from "./academicFaculty.constant";

// create Academic Faculty Into DB
const createAcademicFacultyIntoDB = async (paylode: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(paylode);
  return result;
};
// create Academic Faculty Into DB
const getllAllAcademicFacultyFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyQuery = new QueryBuilder(
    AcademicFacultyModel.find(),
    query,
  )
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};
// get Academic Faculty By Id From DB
const getAcademicFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};
// update Academic Faculty By Id From DB
const updateAcademicFacultyByIdFromDB = async (
  id: string,
  paylode: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, paylode);
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getllAllAcademicFacultyFromDB,
  getAcademicFacultyByIdFromDB,
  updateAcademicFacultyByIdFromDB,
};
