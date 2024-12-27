import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "@/validation/schema/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";

type Props = {
  onSubmit: (fields: LoginSchema) => Promise<void>
}

export function LoginForm({onSubmit}: Props) {
  
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <LoaderButton
          className="w-full"
          type="submit"
          isLoading={false}>
          Entrar
        </LoaderButton>
      </form>
    </Form>
  )
}