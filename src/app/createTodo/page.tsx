import { prisma } from "@/db";
import { Todo } from '@prisma/client';
import { redirect } from "next/navigation";
import Link from "next/link";


async function HandleCreateRequest(t: FormData): Promise<void> {
	'use server'

	const ctx = t.get("title")?.valueOf().toString()
	if(!ctx) throw new Error("Bad request.")

	let td: Todo;
	let body = { data: { title: ctx, complete: false } }

	td = await prisma.todo.create(body)
	if (!td.id) throw new Error("Internal server error.")

	redirect('/')
}

// const New = () => {
// variables or functions can't begin with a <new> word *
const createTodo= () => {
	return (
		<>
			<header className="flex justify-between mb-4 items-center">
				<h1 className="text-2xl">
					Create new
				</h1>
			</header>

			<form action={HandleCreateRequest} className="flex gap-2 flex-col">
				<input 
					type="text" 
					name='title' 
					placeholder="start input.."
					className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" 
				/>

				<div className="flex gap-1 justify-end">
					<Link 
						className="border border-slate-300 text-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:bg-slate-700 focus-within:bg-slate-700" 
						href='..'
					>
						Cancel
					</Link>
					<button 
						className="border border-slate-300 text-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:bg-slate-700 focus-within:bg-slate-700"
					>
						Create
					</button>
				</div>
			</form>
		</>
	)
}

export default createTodo;