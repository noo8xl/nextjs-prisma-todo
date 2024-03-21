import TodoItem from "@/components/TodoItem";
import { Todo } from '@prisma/client';
import { prisma } from "@/db";
import Link from "next/link";


const getTodos = async (): Promise<Todo[]> => {
	return await prisma.todo.findMany()
}


const toggleTodo = async (id: number, complete: boolean): Promise<void> => {
	'use server'

	if(!id) throw new Error("Bad request. Received an empty id field")
	let updated: Todo
	let filter = {
		where: {id}, 
		data: {complete} 
	}

	updated = await prisma.todo.update(filter)
	if (updated.complete !== complete) throw new Error("Internal server error.")
	console.log("Status updated successfully")
}


const Home = async () => {
	const list: Todo[] = await getTodos()

	return (
		<>
			<header className="flex justify-between mb-4 items-center">
				<h1 className="text-2xl">
					Todo
				</h1>
				<Link 
					className="border boreder-slate-300 text-slate-300 px-2 py-1  rounded hover:bg-slate-700  focus-within:bg-slate-700 outline-none" 
					href='/createTodo'
				>
					Create New
				</Link>
			</header>
			<ul className="pl-4">
				{
					list.map(todo => (
						<TodoItem 
							toggleTodo={toggleTodo} 
							id={todo.id} 
							complete={todo.complete} 
							key={todo.id} 
							title={todo.title} 
						/>
					))
				}
			</ul>
		</>
	)
}

export default Home;