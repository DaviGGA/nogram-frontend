import { UseStateSet } from "@/types/UseStateSet";
import { ChangeEvent } from "react";

  export function onChangeImage(
    event: ChangeEvent<HTMLInputElement>,
    setImageFile: UseStateSet<File | undefined> ,
    setPreview?: UseStateSet<string>
  ) {
    const file = event.target.files![0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {if (setPreview) setPreview(reader.result as string)};
    setImageFile(file);
  }