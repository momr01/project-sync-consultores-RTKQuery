import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const SiderAdmin = ({ expandir, setExpandir, setIsOpen, setShowCharts }) => {
  const expandirSider = () => {
    setExpandir(!expandir);
  };

  const openCharts = () => {
    setShowCharts(true);
  };

  const openList = () => {
    setShowCharts(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div
      className={`page-height bg-primary absolute transition-all duration-1000 ${
        expandir ? "w-[150px]" : "w-[50px] sm:w-[80px]"
      }`}
    >
      <div className="relative h-full">
        <button
          onClick={openList}
          className="text-white w-full p-4 flex justify-between hover:bg-secondary border-b-2 border-secondary"
        >
          <TeamOutlined className={`my-auto ${!expandir && "mx-auto"}`} />
          {expandir && <span>Listar todos</span>}
        </button>
        <button
          onClick={openModal}
          className="text-white w-full p-4 flex justify-between hover:bg-secondary border-b-2 border-secondary"
        >
          <UserOutlined className={`my-auto ${!expandir && "mx-auto"}`} />
          {expandir && <span>Agregar nuevo</span>}
        </button>
        <button
          onClick={openCharts}
          className="text-white w-full p-4 flex justify-between hover:bg-secondary border-b-2 border-secondary"
        >
          <PieChartOutlined className={`my-auto ${!expandir && "mx-auto"}`} />
          {expandir && <span>Gráficos</span>}
        </button>
        <div className="absolute bottom-0 w-full">
          <button
            onClick={expandirSider}
            className="text-white w-full text-end"
          >
            {expandir ? (
              <LeftOutlined className="text-lg" />
            ) : (
              <RightOutlined className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiderAdmin;
