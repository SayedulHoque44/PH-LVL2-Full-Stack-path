import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
const { Sider } = Layout;
//
const UserRole = {
  student: "student",
  admin: "admin",
  faculty: "faculty",
};
//
const Sidebar = () => {
  let sidebarItems;
  const role = "student";
  switch (role) {
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
    <Sider breakpoint="lg" collapsedWidth="0">
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
