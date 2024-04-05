import { db } from "../../database/prisma";
import { task_schema_type } from "./dto";

export const add_task = async (data: task_schema_type) => {
  console.log(data);
  const result = await db.task.create({
    data,
  });
  console.log(result);

  return result.id;
};
