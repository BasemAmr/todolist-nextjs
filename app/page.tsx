// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus,Edit, Trash } from "lucide-react";

import {  getTodoListAction } from "@/actions/todo.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";

// interface Todo {
//   id: string;
//   title: string;
//   body: string;
//   completed: boolean;
//   createdAt: Date;
// }


export default async function Home() {



   const todos = await getTodoListAction();

   console.log(todos);
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button>Add Todo <Plus size={24} /> </Button>

          <TodosTable data={todos} />

        <AddTodoForm />
      </main>
  );
}
