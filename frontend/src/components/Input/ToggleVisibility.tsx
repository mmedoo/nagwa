import { useEffect, useRef, } from "react"

export default function ToggleVisibility({ isSecret, setFunction }) {

	const pwiconRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const toggleVisibility = () => {
			setFunction((prev: boolean) => !prev);
		}
		toggleVisibility();
		const pwiconNode = pwiconRef.current; 
		pwiconNode?.addEventListener("click", toggleVisibility);
		return () => {
			pwiconNode?.removeEventListener("click", toggleVisibility);
		}
	}, []);
	
	return (
		<div ref={pwiconRef} className="pwicon">
			{
				isSecret ?
				<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg>
				:
				<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
			}
		</div>
	)
}