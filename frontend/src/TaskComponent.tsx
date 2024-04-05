import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TaskComponent(props: {
  id: string;
  title: string;
  description: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      title: props.title,
      description: props.description,
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
      await axios.put(`http://localhost:3000/tasks/${props.id}`, {
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
      edit_close();
    },
  });

  const { mutate: delete_task, isPending: pending_delete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/tasks/${props.id}`);
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

  const [edit_open, { open: set_edit_open, close: edit_close }] =
    useDisclosure();

  const [delete_open, { open: set_delete_open, close: delete_close }] =
    useDisclosure();

  return (
    <Flex bg={"#e3e3e3"} p={10} align={"center"} justify={"space-between"}>
      <Flex direction={"column"}>
        <Text fw={700}>{props.title}</Text>
        <Text fw={300}>{props.description}</Text>
      </Flex>
      <Flex gap={10}>
        <ActionIcon
          onClick={set_edit_open}
          variant="filled"
          color="blue"
          w={40}
          h={40}
        >
          <IconPencil />
        </ActionIcon>
        <ActionIcon
          onClick={set_delete_open}
          variant="filled"
          color="red"
          w={40}
          h={40}
        >
          <IconTrash />
        </ActionIcon>
      </Flex>
      <Modal opened={edit_open} onClose={edit_close} title="Editar">
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
              Confirmar
            </Button>
          </Flex>
        </form>
      </Modal>

      <Modal opened={delete_open} onClose={delete_close} title="Deletar">
        <Text>
          Tem certeza que deseja deletar esta tarefa? Essa acao nao pode ser
          desfeita
        </Text>
        <Flex mt={20} justify={"space-between"}>
          <Button color="gray" loading={pending_delete}>
            Cancelar
          </Button>
          <Button
            color="red"
            loading={pending_delete}
            onClick={() => delete_task()}
          >
            Confirmar
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
}
