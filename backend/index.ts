import Express from "express";
import { logMiddleware } from "./middleware/logger";
import routes from "./modules/task/router";
import { db } from "./database/prisma";
import cors from "cors";

async function main() {
  const app = Express();
  app.use(Express.json());
  app.use(cors());

  app.use(logMiddleware);

  app.use("/tasks", routes);

  app.get("/", (_, res) => {
    res.send({
      api: "running",
    });
  });

  app.listen(3000, () => {
    console.log("APP RUNNING");
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
  });
