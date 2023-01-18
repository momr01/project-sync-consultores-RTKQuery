import { Spin } from "antd";

const Loading = () => (
  <div className="w-full flex justify-center mt-20">
    <Spin size="large" tip="Cargando..." />
  </div>
);

export default Loading;
