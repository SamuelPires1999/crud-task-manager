import { db } from "../../database/prisma";
import { task_schema_type } from "./dto";

export const add_task = async (data: task_schema_type) => {
  const result = await db.task.create({
    data,
  });
  return result.id;
};

export const find_and_edit_task = async (
  id: string,
  data: Partial<task_schema_type>
) => {
  const result = await db.task.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return result.id;
};
