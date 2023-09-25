import { faker } from "@faker-js/faker";
import "dotenv/config";

import { db } from "./config.server";
import { countDowns, lists } from "./schema.server";

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env");

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

async function main() {
  const newListId = faker.string.uuid();
  await db
    .insert(lists)
    .values({
      id: newListId,
      name: "My List"
    })
    .onConflictDoUpdate({ set: { name: "My List" }, target: lists.id });

  const countDownData: (typeof countDowns.$inferInsert)[] = [];

  for (let i = 0; i < 5; i++) {
    const listId = i % 2 === 0 ? newListId : undefined;
    countDownData.push({
      date: faker.date.future(),
      listId,
      name: `${titleCase(faker.company.buzzNoun())} Day`
    });
  }

  await db.insert(countDowns).values(countDownData);
}

main();
