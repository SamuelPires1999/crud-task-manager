import { z } from "zod";

export const task_schema = z.object({
  title: z
    .string({
      required_error: "Titulo nao pode estar vazio",
      invalid_type_error: "Titulo deve ser um texto",
    })
    .min(1, {
      message: "Titulo deve conter ao menos um caracter",
    }),
  description: z
    .string({
      required_error: "Descricao nao pode estar vazia",
      invalid_type_error: "Descricao deve ser um texto",
    })
    .min(1, {
      message: "Descricao deve conter ao menos um caracter",
    }),
});

export type task_schema_type = z.infer<typeof task_schema>;
