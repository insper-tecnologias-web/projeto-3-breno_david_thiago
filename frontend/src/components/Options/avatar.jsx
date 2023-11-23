import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo(props) {
  return (
    <Avatar className = {props.tamanho}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>Icon</AvatarFallback>
    </Avatar>
  )
}
