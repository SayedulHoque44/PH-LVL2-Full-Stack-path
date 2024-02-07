import QueryBuilder from "../../builder/QueryBuilder";
import {
  AcademicSemesterSearchableFields,
  AcademicSemisterNameCodeMapper,
} from "./academicSemister.Constant";
import { TAcademicSemister } from "./academicSemister.Interface";
import { AcademicSemisterModel } from "./academicSemister.Model";

// create Academic Semister IntoDB
const createAcademicSemisterIntoDB = async (paylod: TAcademicSemister) => {
  if (AcademicSemisterNameCodeMapper[paylod.name] !== paylod.code) {
    throw new Error("Invalid Semister Code!");
  }
  //checking-> semister name -> semester code diffent
  const result = await AcademicSemisterModel.create(paylod);
  return result;
};
// get all academic semister from DB
const getAllAcademicSemisterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(
    AcademicSemisterModel.find(),
    query,
  )
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get single academic semister from DB
const getAcademicSemisterByIDFromDB = async (id: string) => {
  const result = await AcademicSemisterModel.findById(id);
  return result;
};
// get single academic semister from DB
const updateAcademicSemisterByIDFromDB = async (
  id: string,
  paylode: Partial<TAcademicSemister>,
) => {
  // checking is same semister code with same name
  if (
    paylode.name &&
    paylode.code &&
    AcademicSemisterNameCodeMapper[paylode.name] !== paylode.code
  ) {
    throw new Error("Invalid semister code!");
  }

  const result = await AcademicSemisterModel.findByIdAndUpdate(id, paylode);
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getAcademicSemisterByIDFromDB,
  updateAcademicSemisterByIDFromDB,
};
