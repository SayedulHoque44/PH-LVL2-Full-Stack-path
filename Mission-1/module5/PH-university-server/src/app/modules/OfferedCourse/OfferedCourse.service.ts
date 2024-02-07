import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { Course } from "../Course/course.model";
import { FacultyModel } from "../Faculty/faculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.Model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration not found !",
    );
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found !");
  }

  const isAcademicDepartmentExits =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found !");
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found !");
  }

  const isFacultyExits = await FacultyModel.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await offeredCourseQuery.countTotal();

  const result = await offeredCourseQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: userId });

  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, `this user dosen't exist!`);
  }

  const currentOnGoingRegistrationSemester = await SemesterRegistration.findOne(
    { status: "ONGOING" },
  );
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, `There is no onGoing Semester!`);
  }

  const aggregationQuery = [
    /*
    // stage-1
    1. match current ongoin semister on 
    2. match academic faculty of current auth student
    3. match academic department of current auth student
    */
    {
      $match: {
        semesterRegistration: currentOnGoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    /*
    // stage-2
    1. bring course from courses colleciton using course(localField) and in course collection matching field is _id
    2. then create it as it coure , and it will be inside an array so we have to $unwind it in stage -3
     */
    {
      $lookup: {
        from: "courses", //collection name
        localField: "course", //present database query field name
        foreignField: "_id", // from where it try to bring and what name was there of this field
        as: "course", //new create name
      },
    },
    // stage-3
    {
      $unwind: "$course",
    },
    /*
    // stage-4 
    1. bring enrolledCourse from enrolledcourses colleciton but before bring it should have to match some field
    2. to match field we can execute pipline inside the lookup
    3. semesterRegistration & student id have to same and isEnrolled have to true, if match then bring thos enrolledcourses
     */
    {
      $lookup: {
        from: "enrolledcourses", //collection name
        let: {
          // variable
          currentOnGoingRegistrationSemester:
            currentOnGoingRegistrationSemester?._id,
        },
        pipeline: [
          // pipline in lookup
          {
            $match: {
              $expr: {
                //expression
                $and: [
                  //and for multiple query
                  {
                    // match specific semester
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOnGoingRegistrationSemester", //use variable
                    ],
                  },
                  {
                    //match specific student
                    $eq: [
                      "$student",
                      student._id, //or we can use variable
                    ],
                  },
                  {
                    //match isEnrolled True
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses", //new create name
      },
    },
    // stage-5
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    // stage-6
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },
    /*
    // stage-7
    1.add new field named isAlreadyEnrolled, to remove already enrolled courses
     */
    {
      // aggregation map ----->
      $addFields: {
        // if is Pre Requisites course completed of course
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ["$course.preRequisiteCourses", []] },
            {
              $setIsSubset: [
                "$course.preRequisiteCourses.course",
                "$completedCourseIds",
              ],
            },
          ],
        },
        //
        isAlreadyEnrolled: {
          $in: [
            "$course._id", //checking this id exits on this array
            {
              $map: {
                input: "$enrolledCourses", //map array on enrolledCourses
                as: "enroll", //single Item of array enrolledCourse
                in: "$$enroll.course", //get only enroll_course_id from element enroll
              },
            },
          ],
        },
      },
    },
    /*
    // stage-6
    show all doc which isAlreadyEnrolled value is false
     */
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];
  //
  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);
  const total = await OfferedCourse.aggregate(aggregationQuery);
  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id)
    .populate("semesterRegistration")
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment");

  if (!offeredCourse) {
    throw new AppError(404, "Offered Course not found");
  }

  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }

  const isFacultyExists = await FacultyModel.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found");
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistation).select("status");

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester is ${semesterRegistrationStatus?.status}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  getMyOfferedCoursesFromDB,
};
