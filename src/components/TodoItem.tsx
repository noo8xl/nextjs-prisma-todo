'use client'

type TodoItemProps = {
	title: string
	id: number
	complete: boolean
	toggleTodo: (id: number, complete: boolean) => void
}

const TodoItem = (dto: TodoItemProps) => {
	return <>
		<li className="flex gap-1 items-center">
			<input 
				onChange={e => dto.toggleTodo(dto.id, e.target.checked)} 
				id={dto.id.toString()} 
				type='checkbox' 
				defaultChecked={dto.complete} 
				className="cursor-pointer peer" 
			/>
			<label 
				className="peer:checked:line-through cursor-pointer peer:checked:color-slate-500" 
				htmlFor={dto.id.toString()}
			>
				{dto.title}
			</label>
		</li>
	</>
}

export default TodoItem;