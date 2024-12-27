import { LoginForm } from "./components/LoginForm";
import * as UserService from "@/api/user-service";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/validation/schema/login-schema";
import { Link } from "react-router-dom";


export function Login() {

  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmitLogin(values: LoginSchema) {
    const [err, response] = await UserService.login(values);

    if(err) {
      toast({
        title: "Erro ao logar",
        description: err.name === "InternalServerError" ?
        "Email ou senha inválidos." : "Algo inesperado aconteceu."
      })
      return
    }

    if(response) {
      localStorage.setItem("accessToken", response.data.token);


      const [err, _] = await UserService.getLoggedUserProfile();

      if(err) {
        navigate("/create-profile")
        return
      }

      navigate("/home");
    }

  }




  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="mb-3">
          <h1 className="text-5xl text-center font-extrabold text-gray-900">Bem-vindo de volta!</h1>
          <p className="text-center">Ainda não tem conta? {" "}
            <Link to={"/signup"} className="font-medium text-primary hover:text-primary-dark">Crie aqui!</Link>
          </p>
        </div>
        <LoginForm
        onSubmit={onSubmitLogin}
        />
      </div>
    </div>
  )
}