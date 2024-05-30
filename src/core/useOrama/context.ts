import { create, insert, PartialSchemaDeep, search } from "@orama/orama";
import { schema } from "./orama-db.schema";

export const initDb = async () => {
  return await create(schema);
};

export const insertDb = async (db: any, obj: any) => {
  await insert(db, obj);
};
