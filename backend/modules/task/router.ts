import { Router } from "express";
import { db } from "../../database/prisma";

const routes = Router();

routes.get("/all", async (_, res) => {
  const tasks = await db.task.findMany();
  return res.json(tasks);
});

export default routes;
