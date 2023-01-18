import { Spin } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectEmployeesById,
  useUpdateEmployeeMutation,
} from "../../app/employeesSlice";
import { useAuth } from "../../auth/authProvider";
import { errorMsg, successMsg } from "../../helpers/functions";
import routes from "../../helpers/routes";
import { editConsultor } from "../../helpers/static";
import { formCrud } from "../../style";
import { FormBase } from "../index";

const ConsultorDataForm = () => {
  const { id } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const consultor = useSelector((state) => selectEmployeesById(state, id));
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  /**
   * se establecen los valores por defecto del formulario
   */
  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = consultor?.name;
    defaultValues.surname = consultor?.surname;
    defaultValues.division = consultor?.division;
    defaultValues.subdivision = consultor?.subdivision;
    defaultValues.url_photo = consultor?.url_photo
      ? `${consultor?.url_photo}`
      : "./img/";
    defaultValues.biography = consultor?.biography
      ? `${consultor?.biography}`
      : "";
    defaultValues.phone = consultor?.phone ? `${consultor?.phone}` : "";
    defaultValues.email = consultor?.email ? `${consultor?.email}` : "";
    defaultValues.password = consultor?.password
      ? `${consultor?.password}`
      : "";
    reset({ ...defaultValues });
  }, [reset, consultor]);

  const onSubmit = async (dataForm) => {
    const dataCompleted = {
      role: consultor.role,
      phone: dataForm.phone,
      url_photo:
        dataForm.url_photo.length === 1
          ? `/img/${dataForm.url_photo[0].name}`
          : consultor.url_photo,
      biography: dataForm.biography,
      name: consultor.name,
      surname: consultor.surname,
      division: consultor.division,
      subdivision: consultor.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };

    const keys = Object.keys(dataCompleted);
    const changes = keys.filter((key) => dataCompleted[key] !== consultor[key]);

    if (changes.length > 0) {
      dataCompleted._id = consultor?._id;

      try {
        await updateEmployee(dataCompleted).unwrap();
        successMsg(`Tus datos se actualizaron correctamente`);
        navigate(routes.admin);
      } catch (err) {
        errorMsg(`Ocurrió un error al intentar actualizar tus datos`);
      }
    } else {
      errorMsg("Sin cambios para actualizar");
    }
  };

  return (
    <section className="ss:pt-10 pt-5 font-poppins page-height overflow-auto">
      <div className="mb-10 flex ss:justify-center mx-5 ss:mx-0 flex-col ss:flex-row">
        <h2 className="text-[30px] my-auto mr-10 text-center ss:order-1 order-2">
          Actualizar datos
        </h2>
        <Link className="ss:my-auto mb-5 ss:order-2 order-1" to={routes.home}>
          Volver
        </Link>
      </div>
      <form className="w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:flex-row flex-col md:justify-between">
          <div className="md:w-[50%] sm:w-[80%] w-[100%] md:border-r-2 sm:px-10 md:order-1 order-2 mx-auto">
            <div className="flex justify-between md:mb-10 my-2">
              <label className={formCrud.label}>Seleccione una imagen:</label>
              <input
                type="file"
                className={formCrud.input}
                {...register("url_photo")}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            <div className="flex justify-between my-4">
              <label className={formCrud.label}>Biografía:</label>
              <textarea
                maxLength={500}
                {...register("biography")}
                className="border-2 sm:w-[60%] w-[74%] resize-none focus:outline-secondary h-[200px] rounded-lg"
              ></textarea>
            </div>
          </div>

          <div className="md:w-[50%] sm:w-[80%] w-[100%] md:border-l-2 sm:px-10 md:order-2 order-1 mx-auto">
            {editConsultor.map((input, index) => (
              <FormBase
                key={index}
                data={input}
                styles={formCrud}
                register={register}
                errors={errors}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bottom-3 py-2 w-[40%] rounded-md mt-5 mb-5 text-primary ${
              isLoading
                ? "bg-slate-200"
                : "bg-secondary hover:bg-primary hover:text-white"
            }`}
          >
            {isLoading ? <Spin size="medium" /> : "Actualizar"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConsultorDataForm;
