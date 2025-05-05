import { Navigate, useNavigate, useParams } from 'react-router';
import TaskMenu from '../../components/TaskMenu';
import TaskPage from '../../components/TaskPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import { setSelected } from '../../features/selectedSlice';
import { toggleTodoCompletion } from '../../features/todos/todosSlice';
import { ListHeader } from '../../components/ListHeader';
import { TaskData } from '../../types';
import { get_all_taskData_from_listId } from '../../features/todos/todosSelectors';
import {
	addToDoAndUpdateSelection,
	deleteTodoAndUpdateSelection
} from '../../features/todos/todosActions';
import "./list.css"

export default function List() {

	const { listId } = useParams();

	
	const tasks = useSelector((state: RootState) => {
		if (!listId) {
			return null;
		}
		return get_all_taskData_from_listId(state, listId)
	}
	);

	if (!tasks) {
		return <Navigate to="/404" />;
	}

	return <ListPage tasks={tasks} />
}

// This component is the main entry point for the List page.
function ListPage( { tasks }: { tasks: TaskData[] } ) {

	const { taskId, listId } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const selectedId = useSelector((state: RootState) => state.selected);

	useEffect(() => {
		navigate(`/${listId}/${selectedId}`, { replace: true });
	}, [selectedId, listId])

	// This effect is to sync selected task state with the path in the URL.
	useEffect(() => {
		const task = tasks.find((task) => task.id === taskId);
		if (task) {
			dispatch(setSelected(task.id));
		} else {
			dispatch(setSelected(''));
		}
	}, [])

	useEffect(() => {

		// if (!listId)
			// return;
		
		const keyboardEventHandler = (e: KeyboardEvent) => {
			if (!listId)
				return;
			
			const isTargetInput = e.target instanceof HTMLInputElement;
			const isTargetTextArea = e.target instanceof HTMLTextAreaElement;

			if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
				e.preventDefault();

				addToDoAndUpdateSelection({
					listId: listId,
					taskTitle: `Task #${tasks.length}`
				});
				return;
			}
			
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				if (isTargetTextArea)
					return;
				
				e.preventDefault();
				
				const offset = e.key === "ArrowUp" ? -1 : 1;
				const currentIndex = tasks.findIndex((task) => task.id === selectedId);
				const nextIndex = currentIndex + offset;
				const nextTaskId = tasks[nextIndex]?.id ?? selectedId;
				dispatch(
					setSelected(nextTaskId)
				);
				return;
			}

			// The Subsequent events needs taskId to be defined
			if (!selectedId)
				return;
			
			if (e.key === " ") {
				if (isTargetInput || isTargetTextArea)
					return;
				e.preventDefault();
				dispatch(
					toggleTodoCompletion({
						listId,
						taskId: selectedId
					})
				);
				return;
			}
	
			if (e.key === "Delete") {
				e.preventDefault();
				deleteTodoAndUpdateSelection({
					listId,
					taskId: selectedId
				});
				return;
			}
		}
		
		window.addEventListener("keydown", keyboardEventHandler);

		return () => {
			window.removeEventListener("keydown", keyboardEventHandler);
		}

	}, [selectedId, tasks]);

	return (
		<div>
			<ListHeader />
			
			<div id='list-container'>
				
				<TaskMenu />
				
				{taskId && <TaskPage />}
				
			</div>
		</div>
	);
}