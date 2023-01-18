import ReactWhatsapp from "react-whatsapp";
import { LoginForm } from "../components";

const Login = () => (
  <div className="fondo_gradient_login page-height-login overflow-auto">
    <section className="container mx-auto py-10">
      <div>
        <h1 className="text-white font-bold mb-6 text-3xl font-poppins text-center">
          Iniciar Sesión
        </h1>
      </div>

      <LoginForm />
      <div className="flex justify-center">
        <h3 className="text-white my-auto italic mr-3 text-base">
          No puedes ingresar?
        </h3>
        <div className="my-auto">
          <WhatsappLink />
        </div>
      </div>
    </section>
  </div>
);

const WhatsappLink = () => (
  <ReactWhatsapp
    number="+54 9 2613 01-6290"
    message="Hola! No puedo ingresar a mi gestión. Gracias!"
  >
    <div className="flex">
      <div className="my-auto text-white font-bold mr-2 hover:underline hover:underline-offset-4 text-base">
        Escríbenos
      </div>
      <div>
        <img
          src="./img/whatsapp.png"
          alt="logo-whatsapp"
          className="w-10 my-auto"
        />
      </div>
    </div>
  </ReactWhatsapp>
);

export default Login;
