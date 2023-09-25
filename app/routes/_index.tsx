import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/db/config.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { content: "Welcome to Remix!", name: "description" }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const lists = await db.query.lists.findMany();
  const countDowns = await db.query.countDowns.findMany({
    orderBy: (countDowns, { asc }) => [asc(countDowns.date)],
    with: { list: true }
  });
  return json({ countDowns, lists });
}

export default function Index() {
  const { countDowns, lists } = useLoaderData<typeof loader>();
  console.log({ countDowns, lists });
  return (
    <>
      <section className="rounded-md bg-[#f5f5f5] p-4 shadow-md">
        <h2>Section</h2>
        <ul>
          {countDowns.map((countdown) => (
            <li key={countdown.id}>
              {countdown.name} {countdown.date}{" "}
              {countdown.list?.name ?? "No list"}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
