import { Flex, ScrollArea, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TaskComponent from "./TaskComponent";

export default function TaskList() {
  const { data, isFetching } = useQuery({
    queryFn: async () => {
      const response = await axios.get<
        {
          id: string;
          title: string;
          description: string;
        }[]
      >("http://localhost:3000/tasks/all");
      return response.data;
    },
    queryKey: ["get_task_list"],
    gcTime: 0,
  });

  if (!data && isFetching) {
    return <Text>Carregando...</Text>;
  }
  return (
    <ScrollArea h={400}>
      <Flex direction={"column"} gap={10}>
        {data?.map((item) => (
          <TaskComponent
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </Flex>
    </ScrollArea>
  );
}
