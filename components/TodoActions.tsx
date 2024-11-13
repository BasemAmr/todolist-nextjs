import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Loader,  Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import { TodoForm } from './AddTodoForm';
import { EditTodoForm } from './EditTodoForm';

const TodoActions = (
    {data, _idx} : {data: (TodoForm & {id: string})[], _idx: number}
) => {

    const [loading, setLoading] = useState(false);

  return (
    <>
        <EditTodoForm data={data[_idx]} />
        <Button variant="destructive" size="sm" color="red" disabled={loading} 
            onClick={async () => {
            setLoading(true);
            (await deleteTodoAction({id: data[_idx].id}))
            setLoading(false);
            }}>
            {
                loading ? 
                <span className='animate-spin'> <Loader /> </span>
                : <Trash size={8} />
            }
        </Button>
    </>
  )
}

export default TodoActions