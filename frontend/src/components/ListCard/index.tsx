import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../app/store";
import { get_list_completion_percentage } from "../../features/todos/todosSelectors";
import { MappedListData } from "../../types";
import { removeList } from "../../features/todos/todosSlice";
import "./listCard.css"

export function ListCard({ list }: { list: MappedListData }) {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const completionPercentage = useSelector((state: RootState) =>
		get_list_completion_percentage(state, list.id) || 0
	)

	const delRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleDelete = (e: MouseEvent) => {
			if (delRef.current && delRef.current.contains(e.target as Node)) { // Making sure user isn't clicking on the card
				e.stopPropagation();
				dispatch(
					removeList({
						listId: list.id
					})
				);
			}
		};

		const delNode = delRef.current;
		delNode?.addEventListener("click", handleDelete);
		return () => {
			delNode?.removeEventListener("click", handleDelete);
		};
	}, [])

	return (
		<div
			className="todo-list-card"
			onClick={() =>
				navigate(`/${list.id}`)
			}
		>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>

				<span className="title">{list.title}</span>
				
				<button className="deleteButton" ref={delRef}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"> <path d="M3 6h18"></path> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path> <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path> <path d="M10 11v6"></path> <path d="M14 11v6"></path>
					</svg>
				</button>
			</div>
			<span className="light-text completion">{completionPercentage}% Completed</span>
		</div>
	);
}