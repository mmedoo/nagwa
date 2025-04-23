import { useMemo, useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { ListIdType, TaskData } from "../../types";
import TaskMenuItem from "./TaskMenuItem";
import { get_all_taskData_ordered } from "../../features/todos/todosSelectors";
import { addToDoAndUpdateSelection } from "../../features/todos/todosActions";
import "./TaskMenu.css";

// This is not meant to be a real counter,
// just a way to generate unique titles for lists
let n = 0;

export default memo(function Menu() {

	const dragged = useRef<TaskData["id"] | null>(null);
	const draggedOver = useRef<TaskData["id"] | null>(null);

	const { listId } = useParams();

	const tasks = useSelector((state: RootState) =>
		get_all_taskData_ordered(state, listId as ListIdType)
	) as TaskData[]; // Will never be undefined as per check in parent component

	const tasksItemsComponents = useMemo(() => {
		return tasks.map((task: TaskData) =>
			<TaskMenuItem
				dragRef={dragged}
				dragOverRef={draggedOver}
				key={task.id}
				data={task}
			/>
		)
	}, [tasks]);

	const newRef= useRef<HTMLButtonElement>(null);
	const menuRef= useRef<HTMLDivElement>(null);

	useEffect(() => {

		const controller = new AbortController();
		const config = { signal: controller.signal };

		const newTask = () => {
			addToDoAndUpdateSelection({
				listId: listId as ListIdType, // Will never be undefined as per check in parent component
				taskTitle: `Task #${n++}`
			});
		}

		newRef.current?.addEventListener("click", newTask, config);

		return () => {
			controller.abort();
		}
	}, []);

	return (
		<div ref={menuRef} id="menu">

			<div id="btns">
				<button className="primary-button" ref={newRef}>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }} > <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>
					New Task
				</button>
			</div>

			{
				tasks?.length === 0 &&
				<>
					<span className="light-text">
						No Tasks Yet
					</span>
					<span className="light-text">
						[Ctrl + B] to Add New Task
					</span>
				</>
			}

			<div id="tasks">
				{tasksItemsComponents}
			</div>

			<div className="light-text" id="note">
				Up/Down to Move
			</div>
		</div>
	)
})


