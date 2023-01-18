import { colConsultorPage } from "../helpers/static";

const ConsultorTable = ({ consultor }) => (
  <div>
    <table className="w-full ss:mt-10 rounded-md mb-10">
      <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          {colConsultorPage.map((col) => (
            <th
              className="p-3 text-sm font-semibold tracking-wide text-left"
              key={col.key}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="odd:bg-white even:bg-slate-200">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {consultor.name}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {consultor.surname}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {consultor.phone}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {consultor.division}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            {consultor.email}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ConsultorTable;
