import { prisma } from '@/db'

import Link from "next/link"
import { TodoItem } from './components/TodoItems';
  //await prisma.todo.create({data: { title: "test", complete: false}})

async function getTodos() {
  return await prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  // throw new Error("Function not implemented.");
  // console.log(id, complete)
  await prisma.todo.update({where: { id }, data: { complete }})
}

export default async function Page(){

  const todos = await getTodos()

  return <>
    <header  className = "flex justify-between items-center mb-4">
      <h1 className = "text-2x1">Todos</h1>
      <Link 
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" 
        href = "/new"
      >New</Link>
    </header>
    <ul className = "pl-4">
      {todos.map((todo:any, index: number) =>(
        // <li key = {todo.id}>{todo.title}</li>
        <TodoItem key={todo.id} {...todo} toggleTodo = {toggleTodo} />
      ))}
    </ul>
  </>
}