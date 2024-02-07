import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { UserModel } from "../modules/user/user.model";

const superUser = {
  id: "0001",
  email: "sayedulhoque3544@gmail.com",
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database connected we will check is there any user who is super admin
  const isSuperAdminExists = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExists) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
