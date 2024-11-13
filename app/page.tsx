// import Image from "next/image";

import {  getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";
import { auth } from "@clerk/nextjs/server";

// interface Todo {
//   id: string;
//   title: string;
//   body: string;
//   completed: boolean;
//   createdAt: Date;
// }


export default async function Home() {

    const {userId} = await auth();


   const todos = await getTodoListAction(
         {user_id: userId}
   );

   console.log(todos);
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <AddTodoForm userId={userId} />

          <TodosTable data={todos} />

      </main>
  );
}
