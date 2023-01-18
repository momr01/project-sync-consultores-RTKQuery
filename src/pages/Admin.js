import { useState } from "react";
import { Layout } from "antd";
import {
  HeaderAdmin,
  Modales,
  ShowCharts,
  SiderAdmin,
  TableAdmin,
  withRole,
} from "../components";

const Admin = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { Content } = Layout;

  const [expandir, setExpandir] = useState(false);

  return (
    <>
      <Layout>
        <SiderAdmin
          expandir={expandir}
          setExpandir={setExpandir}
          setIsOpen={setIsOpen}
          setShowCharts={setShowCharts}
        />

        <Layout
          className={`site-layout ${
            expandir ? "ml-[160px]" : "ml-[60px] sm:ml-[90px]"
          } transition-all duration-1000`}
        >
          <Content className="overflow-auto page-height">
            <div className="container mx-auto">
              {showCharts ? (
                <ShowCharts />
              ) : (
                <>
                  <HeaderAdmin />
                  <div className="overflow-x-auto">
                    <TableAdmin />
                  </div>
                </>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modales isOpen={isOpen} setIsOpen={setIsOpen} add={true} />
    </>
  );
};

export default withRole(Admin, "admin");
