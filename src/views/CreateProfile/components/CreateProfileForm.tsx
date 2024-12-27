import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";
import { createProfileSchema, CreateProfileSchema } from "@/validation/schema/create-profile-schema";

type Props = {
  onSubmit: (fields: CreateProfileSchema) => Promise<void>
}

export function CreateProfileForm({onSubmit}: Props) {
  
  const form = useForm<CreateProfileSchema>({
    resolver: zodResolver(createProfileSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input className="bg-white-400 p-5" placeholder="Insira aqui seu apelido na plataforma" {...field} />
              </FormControl>
              <FormDescription>
              Pode incluir caracteres especiais e números
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="bg-white-400 p-5" placeholder="Insira aqui o seu nome" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input className="bg-white-400 p-5" placeholder="Insira aqui o seu sobrenome" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <LoaderButton
          className="w-full"
          type="submit"
          isLoading={false}>
          Criar perfil
        </LoaderButton>
      </form>
    </Form>
  )
}