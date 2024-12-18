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
import { useState } from "react";
import { LoaderButton } from "@/components/ui/loader-button";

type Props = {
  onSubmit: (fields: SignupSchema) => Promise<void>
}

export function SignupForm({onSubmit}: Props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema)
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
        <LoaderButton
          className="w-full"
          type="submit"
          isLoading={isButtonLoading}>
          Criar conta
        </LoaderButton>
      </form>
    </Form>
  )
}