import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/authProvider";
import { formLogin } from "../../style";
import { formLoginData } from "../../helpers/static";
import { FormBase } from "../index";
import { useGetLoginMutation } from "../../app/employeesSlice";
import { Spin } from "antd";

const LoginForm = () => {
  const { login } = useAuth();

  const [getLogin, { data, isSuccess, isError, isLoading }] =
    useGetLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      login(data?.role, data?._id);
    }
  }, [isSuccess, data, login]);

  const onSubmit = async (body) => {
    try {
      await getLogin(body);
    } catch (err) {
      console.error("Failed to update the employee", err);
    }
  };

  return (
    <form
      className="flex flex-col md:w-[50%] w-[90%] mx-auto mt-20 font-poppins"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formLoginData.map((input, index) => (
        <FormBase
          key={index}
          data={input}
          styles={formLogin}
          register={register}
          errors={errors}
        />
      ))}

      <div className="flex justify-center">
        <button
          type="submit"
          className="btn bg-secondary w-full py-3 text-lg font-semibold hover:bg-primary hover:text-secondary text-primary p-2 rounded-lg"
        >
          {isLoading ? <Spin size="medium" /> : "Iniciar Sesión"}
        </button>
      </div>
      <div className="relative">
        {isError && (
          <div className="xl:absolute border-2 mt-8 bg-red-200 text-red-500 rounded-lg md:text-lg font-bold text-center py-[4px]">
            Error al intentar ingresar. Por favor verifique los datos.
          </div>
        )}
      </div>

      <hr className="my-10 border-1" />
    </form>
  );
};

export default LoginForm;
