import { useSelector } from "react-redux";
import { colAdminPage } from "../helpers/static";
import { Link } from "react-router-dom";
import routes from "../helpers/routes";
import Loading from "./Loading";
import {
  selectEmployeesById,
  selectEmployeesIds,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../app/employeesSlice";
import { selectSearchItems } from "../app/SearchSlice";
import { errorMsg, successMsg } from "../helpers/functions";

const TableAdmin = () => {
  const { isLoading, isSuccess, isError, error } = useGetEmployeesQuery();

  const employeesIds = useSelector(selectEmployeesIds);
  const searchItems = useSelector(selectSearchItems);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    if (searchItems.length !== 0) {
      content = searchItems.map((empId, index) => (
        <TrTable key={index} empId={empId} />
      ));
    } else {
      content = employeesIds.map((empId, index) => (
        <TrTable key={index} empId={empId} />
      ));
    }
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <table className="w-full mt-10 rounded-md">
      <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          {colAdminPage.map((col) => (
            <th
              className="p-3 text-sm font-semibold tracking-wide text-left"
              key={col.key}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">{content}</tbody>
    </table>
  );
};

const TrTable = ({ empId }) => {
  const empleado = useSelector((state) => selectEmployeesById(state, empId));

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = async (data) => {
    try {
      await deleteEmployee({ id: data }).unwrap();
      successMsg(`Se eliminó el empleado correctamente`);
    } catch (err) {
      errorMsg("Ocurrió un error al intentar eliminar el empleado");
    }
  };

  return (
    <tr className="odd:bg-white even:bg-slate-200">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.name}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.surname}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.phone}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.division}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.subdivision}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {empleado.email}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <Link
          className="btn bg-green-200 text-green-800 p-1 rounded-md hover:bg-green-800 hover:text-green-200 mr-5"
          to={routes.adminEditOther(empleado._id)}
        >
          Editar
        </Link>
        <button
          onClick={() => handleDelete(empleado._id)}
          className="btn bg-red-200 text-red-800 p-1 rounded-md hover:bg-red-800 hover:text-red-200"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TableAdmin;
