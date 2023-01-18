import { Navbar, Footer } from "../index";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
    <Footer />
  </>
);

export default Layout;
