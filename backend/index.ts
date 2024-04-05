import Express from "express";
import { logMiddleware } from "./middleware/logger";

const app = Express();

app.use(logMiddleware);

app.get("/", (_, res) => {
  res.send({
    Hello: "Samuel",
  });
});

app.listen(3000, () => {
  console.log("APP RUNNING");
});
