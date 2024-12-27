import { Loader2 } from "lucide-react";
import { ButtonProps, Button } from "@/components/ui/button";

export function LoaderButton(props: ButtonProps & {isLoading: boolean}) {
  return (
    <Button disabled={props.isLoading && props.disabled} {...props}>
      {props.isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin"/> : null}
      {props.children}
    </Button>
  )
}