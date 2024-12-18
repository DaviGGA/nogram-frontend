import { SignupForm } from "./components/SignupForm";
import { SignupSchema } from "@/validation/schema/sign-schema";
import * as UserService from "@/api/user-service";
import { useToast } from "@/hooks/use-toast";
import { ApiErrors } from "@/errors/ApiErrors";

export function Signup() {

  const { toast } = useToast();

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
      const toastMessage = ApiErrors[err.name];

      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        variant: "destructive"
      })
      return
    }

    console.log(response.data);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="mb-3">
          <h1 className="text-5xl text-center font-extrabold text-gray-900">Crie sua conta</h1>
          <p className="text-center">Ou <span className="font-medium text-primary hover:text-primary-dark">logue na sua conta existente</span></p>
        </div>
        <SignupForm
        onSubmit={onSubmitCreateAccount}
        />
      </div>
    </div>
  )
}