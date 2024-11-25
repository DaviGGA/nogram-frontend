import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signupSchema, SignupSchema } from "@/validation/schema/sign-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Signup() {

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema)
  })

  function onSubmitCreateAccount(values: SignupSchema) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="mb-3">
          <h1 className="text-5xl text-center font-extrabold text-gray-900">Crie sua conta</h1>
          <p className="text-center">Ou <span className="font-medium text-primary hover:text-primary-dark">logue na sua conta existente</span></p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitCreateAccount)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input className="bg-white-400 p-5" placeholder="Insira seu nome" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="bg-white-400 p-5" placeholder="Insira seu email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input className="bg-white-400 p-5" type="password" placeholder="Insira sua senha" {...field} />
                  </FormControl>
                  <FormDescription>
                  Senhas devem conter ao menos um caractere especial e um dígito.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirme a senha</FormLabel>
                  <FormControl>
                    <Input className="bg-white-400 p-5" type="password" placeholder="Confirme a sua senha" {...field} />
                  </FormControl>
                  <FormDescription>
                  As senhas devem coincidir
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Criar conta</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}