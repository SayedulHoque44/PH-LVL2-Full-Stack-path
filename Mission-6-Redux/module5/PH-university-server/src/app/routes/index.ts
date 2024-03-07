import { Router } from "express";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CourseRoutes } from "../modules/Course/course.routes";
import { EnrolledCourseRoutes } from "../modules/EnrolledCourse/enrolledCourse.routes";
import { facultyRoutes } from "../modules/Faculty/faculty.routes";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { AcademicFacultysRoutes } from "../modules/academicFaculty/academicFacult.routes";
import { AcademicSemisterRoutes } from "../modules/academicSemister/academicSemister.Routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { StudentRoutes } from "../modules/student/studen.routes";
import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

const moduleRouets = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semister",
    route: AcademicSemisterRoutes,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultysRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/faculty",
    route: facultyRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/offered-courses",
    route: offeredCourseRoutes,
  },
  {
    path: "/enrolled-courses",
    route: EnrolledCourseRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

//
moduleRouets.forEach(route => router.use(route.path, route.route));

// router.use("/users", UserRoutes);
// router.use("/students", StudentRoutes);

export default router;
