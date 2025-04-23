import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { ListData } from "../../types";
import { get_list_completion_percentage } from "../../features/todos/todosSelectors";
import "./header.css"

export function ListHeader() {
	const { listId } = useParams();
	const list = useSelector((state: RootState) =>
		state.todos.find(lst => lst.id === listId)
	) as ListData // Will never be undefined as per check in parent.

	const barRef = useRef<HTMLDivElement>(null);
	
	const percentage = useSelector((state: RootState) => 
		get_list_completion_percentage(state, list.id)
	)

	useEffect(() => {
		barRef.current?.animate({
			width: `${percentage}%`
		}, {
			duration: 600,
			easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
			fill: "forwards"
		})
	}, [percentage])
	
	return (
		<div id="list-header" className="header">
			<span id="main">
				{list.title}
			</span>
			
			<br />

			<span id="perc">
				{percentage}% Completed
			</span>

			<div id="progress-bar-container">
				<div
					ref={barRef}
					id="progress-bar"
				></div>
			</div>
			
		</div>
	)
}