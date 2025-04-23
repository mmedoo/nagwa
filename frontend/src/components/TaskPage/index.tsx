import { useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { ListIdType, TaskData, TaskIdType } from "../../types";
import { updateTodo } from "../../features/todos/todosSlice";
import "./TaskPage.css";
import { get_single_taskData } from "../../features/todos/todosSelectors";

export default memo(function TaskPage() {

	const { taskId, listId } = useParams();
	
	const task_data = useSelector((state: RootState) => 
		get_single_taskData(state, listId as ListIdType, taskId as TaskIdType)
	);

	return (
		<div id="dtls">
			{
				task_data &&
				<Inputs task={task_data} />
			}
		</div>
	);
})

// var n = 0;

const Inputs = memo(function ({ task }: { task: TaskData }) {

	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);
	const complRef = useRef<HTMLInputElement>(null);

	const { listId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		const updateTask = () => {
			const data = {
				title: titleRef.current?.value === "" ? `Untitled` : titleRef.current?.value || `Untitled`,
				description: descRef.current?.value || "",
				completed: complRef.current?.checked || false
			}
			dispatch(
				updateTodo({
					listId: listId as ListIdType,
					updatedTask: {
						id: task.id,
						...data
					}
				})
			);
		}

		const titleNode = titleRef.current;
		const descNode = descRef.current;
		const complNode = complRef.current;

		if (titleNode) titleNode.value = task.title ? task.title === "Untitled" ? "" : task.title : "";
		if (descNode) descNode.value = task.description || "";
		if (complNode) complNode.checked = task.completed || false;

		const controller = new AbortController();
		const config = { signal: controller.signal };

		titleNode?.addEventListener("input", updateTask, config);
		descNode?.addEventListener("input", updateTask, config);
		complNode?.addEventListener("change", updateTask, config);

		return () => {
			controller.abort();
		}
	}, [task, listId]);

	useEffect(() => {
		const handleEditKeyboardShortcut = (e: KeyboardEvent) => {
			
			if (e.key === "Enter" || e.key === "e" || e.key === "E") {
				
				if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
					return;
				
				e.preventDefault();
				
				titleRef.current?.focus();
				titleRef.current?.select();
			}
		}
		window.addEventListener("keydown", handleEditKeyboardShortcut);
		return () => {
			window.removeEventListener("keydown", handleEditKeyboardShortcut);
		}
	}, []);

	return (
		<>
			<div>
				<input
					type="checkbox"
					ref={complRef}
					defaultChecked={task.completed}
				></input>
				
				<input
					className={`${task.completed ? "completed" : ""}`}
					placeholder="Title"
					ref={titleRef}
					type="text"
					defaultValue={task.title}
					style={{
						textDecoration: task.completed ? "line-through" : "none",
						opacity: task.completed ? "0.5" : "1",
					}}
				></input>

			</div>
			
			<textarea
				ref={descRef}
				defaultValue={task.description}
				placeholder="Description"
			></textarea>
		</>
	)
})