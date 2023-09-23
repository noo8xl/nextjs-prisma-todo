import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";


const getTodos = async () => {
	const todos = await prisma.todo.findMany()

	return todos
}

const toggleTodo = async (id: string, complete: boolean) => {
	'use server'

	await prisma.todo.update({ where: { id }, data: { complete } })
}


const Home = async () => {
	const todos = await getTodos()



	return (
		<>
			<header className="flex justify-between mb-4 items-center">
				<h1 className="text-2xl">Todo</h1>
				<Link className="border boreder-slate-300 text-slate-300 px-2 py-1  rounded hover:bg-slate-700  focus-within:bg-slate-700 outline-none" href='/new'>New</Link>
			</header>
			<ul className="pl-4">

				{todos.map(todo => (
					<TodoItem toggleTodo={toggleTodo} id={todo.id} complete={todo.complete} key={todo.id} title={todo.title} />
				))}

			</ul>
		</>
	)
}

export default Home;