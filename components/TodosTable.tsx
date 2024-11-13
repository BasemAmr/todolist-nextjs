"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { TodoForm } from "./AddTodoForm"
import TodoActions from "./TodoActions";

const TodosTable = (
    data : {data: (TodoForm & {id: string})[]}
) => {


    console.log(data);

    console.log(typeof data);

    const todos = data.data.map((todo) => ({
        title: todo.title,
        body: todo.body,
        completed: todo.completed
    }))

    const keys = todos[0] ? Object.keys(todos[0]) : null;

  return (
   <Table>
      <TableCaption>Your Todos ! :D </TableCaption>
      <TableHeader>
        <TableRow>
          {
            keys && keys.map((key) => (
                <TableHead key={key}>{key}</TableHead>
            ))
          }
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
            keys && todos.map((todo, _idx) => (
                <TableRow key={todo.title}>
                    {
                        // loop through the keys of the todo object 
                        // if key is completed, render a checkbox checked if true
                        // if key is not completed, render X if false
                        keys.map((key) => (
                            <TableCell key={key}>
                                {
                                    key === "completed" ? (
                                        todo[key as keyof typeof todo] ? "✅" : "❌"
                                    ) : todo[key as keyof typeof todo]
                                }
                            </TableCell>
                        ))
                    }
                    <TableCell>
                        <div className="flex gap-1">
                            <TodoActions data={data.data} _idx={_idx} />
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
      </TableBody>
    </Table>
  )
}

export default TodosTable