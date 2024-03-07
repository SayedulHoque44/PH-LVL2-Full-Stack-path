import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();

  //Std -  ID: "2024030001" , Password:"ami1234"
  //Admin - ID: "A-0001", Password: "ami123", SA-admin12345
  //Faculty - ID: "F-0002", Password: "ami1234",
  const defaultValues = {
    ID: "F-0002",
    Password: "ami1234",
  };
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  //
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.ID,
        password: data.Password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );

      toast.success("Login successfull", { id: toastId });
      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <PHInput type="text" name="ID" label="ID" />
        </div>
        <div>
          <PHInput type="text" name="Password" label="Password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
