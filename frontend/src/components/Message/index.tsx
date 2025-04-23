import "./message.css"

export default function Message({ children }) {
	return (
		<div className="message-container">
			<span className="message-text">{children}</span>
		</div>
	)
}