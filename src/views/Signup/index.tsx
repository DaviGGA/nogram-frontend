import { SignupForm } from "./components/SignupForm";
import { SignupSchema } from "@/validation/schema/sign-schema";
import * as UserService from "@/api/user-service";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {

  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmitCreateAccount(values: SignupSchema) {

    if(!(values.confirmPassword === values.password)) {
      toast({
        title: "Senhas não coincidem",
        description: "O campo senha e confirmar senha devem ser iguais.",
        variant: "info"
      })
      return
    }

    const [err, response] = await UserService.createUser(values);

    if(err) {
      toast({
        title: "Erro ao criar a conta",
        description: "Algo ocorreu e não foi possível criar sua conta.",
        variant: "destructive"
      })
      return 
    }

    if(response) {
      toast({
        title: "Conta criada",
        description: "Sua conta foi criada com sucesso! Bem-vindo!"
      })

      const[err, response] = await UserService.login(values);

      if(err) {
        toast({
          title: "Erro ao logar",
          description: "Algo ocorreu e não foi possível logar na sua conta.",
          variant: "destructive"
        })
        return
      }

      if(response) {
        localStorage.setItem("accessToken", response.data.token);
        navigate("/create-profile");
      }

    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="mb-3">
          <h1 className="text-5xl text-center font-extrabold text-gray-900">Crie sua conta</h1>
          <p className="text-center">Ou {" "}
            <Link to={"/login"} className="font-medium text-primary hover:text-primary-dark">logue na sua conta existente</Link>
          </p>
        </div>
        <SignupForm
        onSubmit={onSubmitCreateAccount}
        />
      </div>
    </div>
  )
}