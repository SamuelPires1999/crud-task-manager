import Express from "express";

const app = Express();

app.get("/", (_, res) => {
  res.send({
    test: "Test",
  });
});

app.listen(3000, () => {
  console.log("APP RUNNING");
});
