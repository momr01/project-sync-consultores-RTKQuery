import Chart from "react-apexcharts";
import { useGetEmployeesQuery } from "../app/employeesSlice";

const ShowCharts = () => {
  const { data: employees } = useGetEmployeesQuery();

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter((key) => predicate(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});

  const assignValues = (values, obj, key, array) => {
    values.forEach((value) => {
      const filtered = Object.filter(obj, (item) => item[key] === value);
      const total = Object.keys(filtered).length;
      array.push(total);
    });
  };

  /**
   * filtrado y asignacion de divisiones
   */
  const divisiones = [];
  const divisionesValues = ["SAP", "Software Factory"];
  assignValues(divisionesValues, employees.entities, "division", divisiones);

  /**
   * filtrado y asignacion de subdivision SAP
   */
  const subdSAP = [];
  const subdSAPValues = ["MM", "SD", "ABAP"];
  assignValues(subdSAPValues, employees.entities, "subdivision", subdSAP);

  /**
   * filtrado y asignacion de subdivision SF
   */
  const subdSF = [];
  const subdSFValues = ["Frontend", "Backend", "Database", "Devops"];
  assignValues(subdSFValues, employees.entities, "subdivision", subdSF);

  return (
    <>
      <div className="mt-10">
        <h2 className="text-3xl font-poppins text-center font-bold text-primary">
          Gráficos
        </h2>
      </div>
      <div className="md:flex md:justify-around">
        <div className="md:w-[50%] md:p-10 ss:w-[70%] mx-auto mb-10">
          <Chart
            type="pie"
            series={divisiones}
            options={{
              title: { text: "Divisiones" },
              noData: { text: "Empty Data" },
              labels: ["SAP", "SF"],
            }}
          ></Chart>
        </div>
        <div className="md:flex md:flex-col md:w-[35%] ss:w-[70%] mx-auto">
          <div className="mb-10 md:mb-0 ss:w-[80%]">
            <Chart
              type="pie"
              series={subdSAP}
              options={{
                title: { text: "Sub-división SAP" },
                noData: { text: "Empty Data" },
                labels: ["MM", "SD", "ABAP"],
              }}
            ></Chart>
          </div>

          <div className="ss:w-[80%]">
            <Chart
              type="pie"
              series={subdSF}
              options={{
                title: { text: "Sub-división SF" },
                noData: { text: "Empty Data" },
                labels: ["Frontend", "Backend", "Database", "Devops"],
              }}
            ></Chart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCharts;
