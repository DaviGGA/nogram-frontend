import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { UseStateSet } from "@/types/UseStateSet"
import { onChangeImage } from "@/utils/onChangeImage";
import { ImagePlus } from 'lucide-react';
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import * as PostService from "../api/post-service"; 
import { toast } from "@/hooks/use-toast";

type Props = {
  open: boolean,
  setOpen: UseStateSet<boolean>
}

export function CreatePostDialog({open, setOpen}: Props) {

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState<string>();

  async function onCreatePostClick() {
    if(!imageFile) {
      return toast({
        title: "Imagem vazia",
        description: "Por favor, insira alguma imagem na sua postagem.",
        variant: "info"
      })
    }

    const [err, response] = await PostService.createPost(description, imageFile)

    if(err) {
      return toast({
        title: "Erro ao criar postagem",
        description: "Algo errado ocorreu e não foi possível criar uma postagem.",
        variant: "destructive"
      })
    }

    if(response) {
      toast({
        title: "Postagem criada",
        description: "Sua postagem foi criada com sucesso.",
        variant: "success"
      })

      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[768px]">
        <DialogHeader>
          <DialogTitle>Criar postagem</DialogTitle>
          <DialogDescription>
            Selecione uma imagem e uma descrição.
          </DialogDescription>
        </DialogHeader>
        <input
          name="image"
          type="file"
          ref={imageInputRef}
          className="w-0 h-0"
          accept="image/*"
          onChange={ e => onChangeImage(e, setImageFile, setImagePreview)}
        />
        <div
        className="w-full flex justify-center items-center h-[460px] cursor-pointer hover:bg-gray-100 transition duration-300"
        onClick={() => imageInputRef.current?.click()}
        >
          {
            imagePreview ?
            <img src={imagePreview} className="w-full h-full"/>
            :
            <ImagePlus className="w-20 h-20 text-center opacity-30"/>
          }
        </div>
        <Label>Descrição</Label>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
        <DialogFooter>
          <Button onClick={onCreatePostClick} type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
