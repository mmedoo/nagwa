import { memo } from "react"
import "./spinner.css"

export default memo(function Spinner() {
	return <svg className="loader" stroke="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" strokeLinecap="round" strokeLinejoin="round"><path opacity="0.15" d="M12 3a9 9 0 1 1-.001 18.001A9 9 0 0 1 12 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.36s" values="64;0" /></path><path d="M12 3a9 9 0 0 1 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.1s" values="16;0" /><animateTransform attributeName="transform" dur="0.4s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></g></svg>
})