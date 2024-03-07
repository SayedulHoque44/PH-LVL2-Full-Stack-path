import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { verifyToken } from "../../utils/verifyToken";
const { Sider } = Layout;
//
const UserRole = {
  student: "student",
  admin: "admin",
  faculty: "faculty",
};
//
const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems;
  switch ((user as TUser).role) {
    case UserRole.admin:
      sidebarItems = sideBarItemsGenerator(adminPaths, UserRole.admin);
      break;
    case UserRole.student:
      sidebarItems = sideBarItemsGenerator(studentPaths, UserRole.student);
      break;
    case UserRole.faculty:
      sidebarItems = sideBarItemsGenerator(facultyPaths, UserRole.faculty);
      break;
    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}>
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
