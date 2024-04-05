import {
  Button,
  Container,
  Divider,
  Flex,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import TaskList from "./TaskList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) =>
        value.length < 1 ? "Titulo deve ter um minimo de caracteres" : null,
      description: (value) =>
        value.length < 1 ? "Descricao deve ter um minimo de caracteres" : null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (args: { title: string; description: string }) => {
      await axios.post("http://localhost:3000/tasks", {
        title: args.title,
        description: args.description,
      });
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      alert("Erro ao tentar adicionar tarefa");
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["get_task_list"],
      });
    },
  });

  return (
    <Container p={20} size={"50rem"}>
      <Title order={1} mb={20}>
        Task Manager
      </Title>
      <form
        onSubmit={form.onSubmit((values) =>
          mutate({
            description: values.description,
            title: values.title,
          })
        )}
      >
        <Flex
          direction={"column"}
          gap={20}
          justify={"space-between"}
          align={"center"}
        >
          <TextInput
            style={{
              width: "100%",
            }}
            label="Titulo"
            {...form.getInputProps("title")}
          />
          <Textarea
            label={"Descricao"}
            style={{
              width: "100%",
            }}
            resize="vertical"
            flex={1}
            {...form.getInputProps("description")}
          />
          <Button fullWidth type="submit" loading={isPending}>
            Adicionar
          </Button>
        </Flex>
      </form>
      <Divider my={20} />
      <TaskList />
    </Container>
  );
}

export default App;
