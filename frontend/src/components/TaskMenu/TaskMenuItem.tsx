import { memo, useEffect, useRef } from "react";
import { TaskData } from "../../types";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { switchTodos } from "../../features/todos/todosSlice";
import { deleteTodoAndUpdateSelection } from "../../features/todos/todosActions";
import { setSelected } from "../../features/selectedSlice";

export default memo(function TaskMenuItem({
	data: task,
	dragRef,
	dragOverRef,
}: {
	data: TaskData,
	dragRef: React.RefObject<TaskData["id"] | null>,
	dragOverRef: React.RefObject<TaskData["id"] | null>,
}) {

	const taskRef = useRef<HTMLDivElement>(null);
	const delRef = useRef<HTMLButtonElement>(null);

	const dispatch = useDispatch();
	const { taskId, listId } = useParams();

	useEffect(() => {
		if (!taskRef.current || !delRef.current || !listId)
			return;
		
		const taskNode = taskRef.current;
		const delNode = delRef.current;

		const controller = new AbortController();
		const config = { signal: controller.signal };

		taskNode?.addEventListener("click", (e) => {
			if (e.target !== delNode)
				dispatch(
					setSelected(task.id)
				)
		}, config);

		delNode?.addEventListener("click", (e) => {
			e.stopPropagation();
			deleteTodoAndUpdateSelection({
				taskId: task.id,
				listId,
			});
		}, config);

		taskNode?.addEventListener("dragstart", () => {
			dragRef.current = task.id;
			taskNode?.classList.add("dragging");
		}, config);

		taskNode?.addEventListener("dragover", (e) => {
			e.preventDefault();
		}, config);

		taskNode?.addEventListener("dragenter", () => {
			dragOverRef.current = task.id;
			if (!dragRef.current)
				return;
			dispatch(
				switchTodos({ // Switch the todos in the redux store
					listId,
					from: dragRef.current,
					to: dragOverRef.current,
				})
			)
		}, config);

		taskNode?.addEventListener("dragend", () => {
			taskNode?.classList.remove("dragging");
			dragRef.current = null;
			dragOverRef.current = null;
		}, config);

		return () => {
			controller.abort();
		}
	}, [taskId, listId]);

	return (
		<div
			ref={taskRef}
			className={`task ${task.id === taskId ? "selected" : ""}`}
			draggable
		>
			<span
				className={`${task.completed ? "completed" : ""}`}
			>
				{task.title}
			</span>

			<button className="deleteButton" ref={delRef}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" > <path d="M3 6h18"></path> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path> <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path> <path d="M10 11v6"></path> <path d="M14 11v6"></path> </svg>
			</button>
		</div>
	)
});
