import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../app/store";
import { ListCard } from "../../components/ListCard";
import { addList } from "../../features/todos/todosSlice";
import Input from "../../components/Input";
import "./home.css"

// This is not meant to be a real counter,
// just a way to generate unique titles for lists
let n = 0

export default function Home() {
	
	const { name: username } = useSelector((state: RootState) => state.auth);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const popUpRef = useRef<HTMLDivElement>(null);

	const lists = useSelector((state: RootState) => state.todos);
	
	const listsCards = useMemo(() =>
		lists.map((list) =>
			<ListCard key={list.id} list={list} />
		)
	, [lists]);

	useEffect(() => {
		const formNode = formRef.current;
		const badgeNode = badgeRef.current;
		const popUpNode = popUpRef.current;

		const controller = new AbortController();
		const config = { signal: controller.signal };

		// Adding new List
		formNode?.addEventListener("submit", (e) => {
			e.preventDefault();
			const newTitle = formNode?.newListTitle.value;
			dispatch(addList({
				title: newTitle === "" ? `List #${n++}` : newTitle,
			}))
			if (formNode)
				formNode.newListTitle.value = "";
		}, config);

		// Pop up menu
		badgeNode?.addEventListener("click", () => {
			popUpNode?.classList.toggle("spread");
		}, config);

		// Losing focus on the badge
		badgeNode?.addEventListener("blur", () => {
			popUpNode?.classList.remove("spread");
		}, config);

		return () => {
			controller.abort();
		}
	}, [])

	return (
		<>
			<div className="header" id="home-header">
				<span id="main">Nagwa Todo-List</span>

				<div ref={badgeRef} tabIndex={0} id="user-badge">
					<img id="user-avatar" src="https://www.gravatar.com/avatar/?d=mp" alt="User Avatar" />

					<span id="user-name">
						{username}
					</span>

					<div ref={popUpRef} className="popup-menu">

						<div
							className="pop-menu-item"
							onClick={() => navigate('/auth/signout')}
						>
							<span>Sign Out</span>
						</div>

					</div>
				</div>
			</div>

			<div className="content">

				<div id="#btns">

					<form ref={formRef}>
						<Input
							type="text"
							placeholder="New list title"
							id="new-list-input"
							name="newListTitle"
						/>
						<button type="submit" className="primary-button">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }} ><path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />	</svg>
							New List
						</button>
					</form>

				</div>

				<div className="todo-lists-container">
					{
						listsCards.length !== 0 ?
							listsCards
							:
							<span className="light-text">
								No Lists Yet
							</span>
					}
				</div>
			</div>
		</>
	)
}