import { Router } from "express";
import { task_schema } from "./dto";
import {
  add_task,
  delete_task,
  find_all_tasks,
  find_and_edit_task,
} from "./actions";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const routes = Router();

routes.get("/all", async (_, res) => {
  const tasks = await find_all_tasks();
  return res.json(tasks);
});

routes.post("/", async (req, res) => {
  try {
    const valid_data = task_schema.parse(req.body);
    const created_id = await add_task(valid_data);
    setTimeout(() => {
      return res.json({
        created_id,
        success: true,
      });
    }, 2000);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error, null, 2));
      const errors = error.issues.map((item) => item.message);
      return res.status(400).send({
        success: false,
        found_errors: errors,
      });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).send({
        success: false,
        found_errors: error.meta,
      });
    }

    return res.status(500).send({
      success: false,
      error: "Unknown server error",
    });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const valid_data = task_schema.parse(req.body);
    const edited_id = await find_and_edit_task(req.params.id, valid_data);
    setTimeout(() => {
      return res.json({
        edited_id,
        success: true,
      });
    }, 2000);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((item) => item.message);
      return res.status(400).send({
        success: false,
        found_errors: errors,
      });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).send({
        success: false,
        found_errors: error.meta,
      });
    }

    return res.status(500).send({
      success: false,
      error: "Unknown server error",
    });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const deleted_id = await delete_task(req.params.id);
    setTimeout(() => {
      res.json({
        deleted_id,
        success: true,
      });
    }, 2000);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).send({
        success: false,
        found_errors: error.meta,
      });
    }

    return res.status(500).send({
      success: false,
      error: "Unknown server error",
    });
  }
});

export default routes;
