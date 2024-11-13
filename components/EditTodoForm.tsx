"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { z } from "zod"
import { updateTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
 
  
  const todoScheme = z.object({
    title: z.string().min(1, "Title is too short"),
    body: z.string().min(1, "Description is too short"),
    completed: z.boolean(),
  });
export  type TodoForm = z.infer<typeof todoScheme>;
  


export function EditTodoForm({data} : {data: TodoForm & {id: string}}) {

    const defaultValues: Partial<TodoForm> = {
        title: data.title,
        body: data.body,
        completed: data.completed,
      };
    
      const form = useForm<TodoForm>({
        resolver: zodResolver(
          todoScheme
        ),
        defaultValues,
      });

      const [open, setOpen] = useState(false);

      const onSubmit = async (formData: TodoForm) => {
        console.log(formData);
        await updateTodoAction({
            id: data.id,
            title: formData.title,
            body: formData.body,
            completed: formData.completed,
        })
        setOpen(false);
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button  variant="outline" size="sm" color="blue">
            <Pen size={8} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo Form</DialogTitle>
          <DialogDescription>
           Time to be productive! ;)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write your todo here 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Todo description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add a short bio to your todo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Todo Completed?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
            <Button type="submit">Edit!</Button>
          </form>
        </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}