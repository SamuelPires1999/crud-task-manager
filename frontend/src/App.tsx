import { Button, Container, Flex, Input, Textarea } from "@mantine/core";

function App() {
  return (
    <Container p={20} size={"50rem"}>
      <Flex
        direction={"column"}
        gap={20}
        justify={"space-between"}
        align={"center"}
      >
        <Input
          placeholder="Titulo"
          style={{
            width: "100%",
          }}
        />
        <Textarea
          style={{
            width: "100%",
          }}
          placeholder="Descricao"
          resize="vertical"
          flex={1}
        />
        <Button fullWidth>Adicionar</Button>
      </Flex>
    </Container>
  );
}

export default App;
