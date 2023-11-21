"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function Toast() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Sucesso.",
          description: "Suas infomações foram salvos com sucesso.",
        })
      }}
    >
      Show Toast
    </Button>
    
    
  )
}
