import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";


async function createTodo(data: FormData) {
	'use server'

	const title = data.get("title")?.valueOf()

	if (typeof title !== "string" || title.length === 0) {
		throw new Error('Wrong title')
	}

	await prisma.todo.create({ data: { title, complete: false } })

	redirect('/')
}

const New = () => {
	return (
		<>
			<header className="flex justify-between mb-4 items-center">
				<h1 className="text-2xl">New</h1>
			</header>

			<form action={createTodo} className="flex gap-2 flex-col">
				<input type="text" name='title' className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />

				<div className="flex gap-1 justify-end">
					<Link className="border border-slate-300 text-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:bg-slate-700 focus-within:bg-slate-700" href='..'>Cancel</Link>
					<button className="border border-slate-300 text-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:bg-slate-700 focus-within:bg-slate-700">Create</button>
				</div>
			</form>
		</>
	)
}

export default New;