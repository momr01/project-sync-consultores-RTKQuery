import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  selectEmployeesById,
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../app/employeesSlice";
import { errorMsg, successMsg } from "../../helpers/functions";
import routes from "../../helpers/routes";
import { formData } from "../../helpers/static";
import { formCrud } from "../../style";
import { Loading, FormBase } from "../index";

const ManageConsForm = ({ add, setIsOpen }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [division, setDivision] = useState();

  const employee = useSelector((state) => selectEmployeesById(state, id));
  const [addNewEmployee, { isLoading: isLoadingAdd }] =
    useAddNewEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingEdit }] =
    useUpdateEmployeeMutation();

  /**
   *
   * @returns
   * se obtiene id desde path o ruta
   */
  // const getId = () => {
  //   const pathname = history.pathname;
  //   const array = pathname.split("/");
  //   const id = array[4];
  //   return id;
  // };
  // const id = getId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setDivision(add ? "" : employee?.division);
  }, [add, employee]);

  /**
   * se definen los valores por defecto del formulario
   */
  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = !add
      ? employee?.name
        ? `${employee?.name}`
        : "Cargando..."
      : "";
    defaultValues.surname = !add
      ? employee?.surname
        ? `${employee?.surname}`
        : "Cargando..."
      : "";
    defaultValues.phone = !add
      ? employee?.phone
        ? `${employee?.phone}`
        : "Cargando..."
      : "";
    defaultValues.division = !add
      ? `${employee?.division}`
      : "Software Factory";
    defaultValues.subdivision = !add ? `${employee?.subdivision}` : "Frontend";
    defaultValues.email = !add
      ? employee?.email
        ? `${employee?.email}`
        : "Cargando..."
      : "";
    defaultValues.password = !add
      ? employee?.password
        ? `${employee?.password}`
        : "Cargando..."
      : "";
    reset({ ...defaultValues });
  }, [reset, add, employee]);

  const handleDivision = (data) => {
    setDivision(data.target.value);
  };

  const onSubmit = async (dataForm) => {
    const dataCompleted = {
      role: "consultor",
      phone: dataForm.phone,
      url_photo: add ? "/img/profile_default.jpg" : employee?.url_photo,
      biography: add ? "" : employee?.biography,
      name: dataForm.name,
      surname: dataForm.surname,
      division: dataForm.division,
      subdivision: dataForm.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };

    if (add) {
      try {
        await addNewEmployee(dataCompleted).unwrap();
        successMsg(`Se agregó el empleado correctamente`);
        reset();
        setIsOpen(false);
      } catch (err) {
        errorMsg(`No se pudo crear el empleado`);
      }
    } else {
      const keys = Object.keys(dataCompleted);

      const changes = keys.filter(
        (key) => dataCompleted[key] !== employee[key]
      );

      if (changes.length > 0) {
        dataCompleted._id = employee?._id;

        try {
          await updateEmployee(dataCompleted).unwrap();
          successMsg(`Se actualizó el empleado correctamente`);
          navigate(routes.admin);
        } catch (err) {
          errorMsg(`No se pudo actualizar el empleado`);
        }
      } else {
        errorMsg("Sin cambios para actualizar");
      }
    }
  };

  return (
    <>
      <div className="flex py-4 justify-center ss:pt-10 ss:flex-row flex-col">
        <h2 className="font-poppins text-3xl ss:my-auto mb-5 mr-5 font-bold text-primary text-center ss:order-1 order-2">
          {add ? (
            "Agregar un nuevo consultor"
          ) : employee?.name ? (
            `Editar el consultor: ${employee?.surname}, ${employee?.name}`
          ) : (
            <Loading />
          )}
        </h2>
        {!add && (
          <Link
            className="ss:my-auto mb-5 hover:underline ss:order-2 order-1 ml-3 ss:ml-0"
            to={routes.home}
          >
            Volver
          </Link>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formCrud.form}>
        {formData.map((input, index) => (
          <FormBase
            key={index}
            data={input}
            styles={formCrud}
            register={register}
            errors={errors}
          />
        ))}

        <div className={formCrud.divInput}>
          <label className={formCrud.label}>División:</label>
          <select
            {...register("division", { required: true })}
            className={formCrud.input}
            onChange={handleDivision}
          >
            <option>Software Factory</option>
            <option>SAP</option>
          </select>
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Sub-división:</label>

          <select
            className={formCrud.input}
            {...register("subdivision", { required: true })}
          >
            {division === "SAP" ? (
              <>
                <option value="MM">MM</option>
                <option value="SD">SD</option>
                <option value="ABAP">ABAP</option>
              </>
            ) : (
              <>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Devops">Devops</option>
              </>
            )}
          </select>
        </div>
        <div className={formCrud.divBtn}>
          <button
            type="submit"
            className={
              isLoadingEdit || isLoadingAdd ? formCrud.loading : formCrud.button
            }
          >
            {add ? (
              isLoadingAdd ? (
                <Spin size="medium" />
              ) : (
                "Agregar"
              )
            ) : isLoadingEdit ? (
              <Spin size="medium" />
            ) : (
              "Editar"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageConsForm;
