import { useState } from "react";
import { Modales } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetEmployeesQuery } from "../app/employeesSlice";
import { revertSearch, setSearchItems } from "../app/SearchSlice";

const HeaderAdmin = () => {
  const dispatch = useDispatch();

  const { register } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const { data: employees } = useGetEmployeesQuery();

  const onModalAddConsToggle = () => {
    setIsOpen(true);
  };

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  /**
   *
   * @param {*} data
   * funcion para filtrar empleados que el usuario desea buscar y mostrarlos
   */
  const handleChange = (data) => {
    if (data.target.value.length > 0) {
      const filtered = Object.filter(
        employees.entities,
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(data.target.value.toLowerCase()) ||
          employee.surname
            .toLowerCase()
            .includes(data.target.value.toLowerCase())
      );
      const ids = Object.keys(filtered);
      dispatch(setSearchItems(ids));
    } else {
      dispatch(revertSearch());
    }
  };

  return (
    <>
      <div className="flex sm:justify-between flex-col sm:flex-row pt-10">
        <div className="my-auto">
          <h1 className="text-3xl font-poppins text-primary font-bold ss:mb-0">
            Lista de consultores
          </h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            className="border-2 p-3 mr-2 focus:outline-secondary w-60 rounded-lg ss:mb-0 mb-3"
            {...register("search")}
            onChange={handleChange}
          />
          <button
            onClick={onModalAddConsToggle}
            className="btn bg-secondary p-3 rounded-md text-primary hover:text-white hover:bg-primary mt-2"
          >
            Añadir consultor
          </button>
        </div>
      </div>
      <Modales isOpen={isOpen} setIsOpen={setIsOpen} add={true} />
    </>
  );
};

export default HeaderAdmin;
