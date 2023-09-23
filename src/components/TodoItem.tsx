'use client'

type TodoItemProps = {
	title: string
	id: string
	complete: boolean,
	toggleTodo: (id: string, complete: boolean) => void
}

const TodoItem = ({ title, id, complete, toggleTodo }: TodoItemProps) => {
	return <>
		<li className="flex gap-1 items-center">
			<input onChange={e => toggleTodo(id, e.target.checked)} id={id} type='checkbox' defaultChecked={complete} className="cursor-pointer peer" />
			<label className="peer:checked:line-through cursor-pointer peer:checked:color-slate-500" htmlFor={id}>{title}</label>
		</li>
	</>
}

export default TodoItem;