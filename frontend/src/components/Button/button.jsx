import { Button } from "@/components/ui/button"

export function ButtonDemo(props) {
  return <Button variant = {props.variante} size = {props.size} >{props.input}</Button>
}
