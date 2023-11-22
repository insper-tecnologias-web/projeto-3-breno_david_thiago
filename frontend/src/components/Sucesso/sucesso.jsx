import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSuccess() {
  return (
    <Alert variant="success">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Sucesso</AlertTitle>
      <AlertDescription>
        Usuário e Senha compativeis. 
        Login efetuado com sucesso.
      </AlertDescription>
    </Alert>
  )
}
