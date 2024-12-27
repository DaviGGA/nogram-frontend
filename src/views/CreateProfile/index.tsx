import { CreateProfileForm } from "./components/CreateProfileForm";
import { CreateProfileSchema } from "@/validation/schema/create-profile-schema";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import * as UserService from "@/api/user-service";
import { ChangeEvent, useRef, useState } from "react";
import blankProfile from "@/assets/imgs/blank-profile-picture.png";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";


export function CreateProfile() {

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmitCreateProfile(values: CreateProfileSchema) {
    const [err, response] = await UserService.createProfile(values);

    if(err) {
      toast({
        title: "Erro ao criar o perfil",
        description: "Algo de errado ocorreu e não foi possível criar o perfil.",
        variant: "destructive"
      })
    }

    if (response) {
      if(!imageFile) return; 
      
      const profileId = response.data.id;
      const [err, _] = await UserService.uploadProfileImage(profileId, imageFile);

      if(err) {
        toast({
          title: "Erro ao enviar imagem",
          description: "Não foi possível enviar imagem de perfil. Você pode alterá-la nas configurações do seu perfil.",
          variant: "info"
        })     
      }

      //navigate("/home");
    }
  }

  function onChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
    setImageFile(file);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <div className="mb-3">
          <h1 className="text-4xl text-center font-extrabold text-gray-900">Falta só mais um pouco!</h1>
          <p className="text-center mt-2">Assim que criarmos o seu perfil você já vai poder usar a plataforma</p>
        </div>
        <input name="image" type="file" ref={imageInputRef} className="w-0 h-0" onChange={onChangeImage}/>
        <Avatar className="w-[160px] h-[160px] cursor-pointer mx-auto" onClick={() => imageInputRef.current?.click()}>
            <AvatarImage src={imagePreview ? imagePreview : blankProfile}/>
        </Avatar>
        <CreateProfileForm onSubmit={onSubmitCreateProfile}/>
      </div>
    </div>
  )
}