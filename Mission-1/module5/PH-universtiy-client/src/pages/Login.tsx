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
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "ami1234",
  //   },
  // });
  const defaultValues = {
    ID: "A-0001",
    Password: "ami123",
  };
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  //
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
      navigate(`/${user.role}/dashboard`);
      toast.success("Login successfull", { id: toastId });
    } catch (error) {
      // toast.error("Somthing went wrong");
      // console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
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
