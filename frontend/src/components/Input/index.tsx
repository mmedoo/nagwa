import React, { memo, useState } from "react";
import ToggleVisibility from "./ToggleVisibility";
import "./input.css";

export default memo(function Input({
	defaultValue,
	type,
	placeholder,
	id,
	name,
	required = false
}: {
	defaultValue?: string,
	pattern?: RegExp,
	type: React.HTMLInputTypeAttribute,
	placeholder: string,
	id: string,
	name: string,
	required?: boolean
}) {

	const [isSecret, setIsSecret] = useState<boolean>(type === "password" ? true : false)

	return (
		<div className="input_cont">
			<input required={required} className="classy-input" defaultValue={defaultValue} placeholder=" " id={id} type={isSecret ? "password" : "secret"} name={name} />
			<label htmlFor={id}>{placeholder}</label>
			{
				type === "password" &&
				<ToggleVisibility
					isSecret={isSecret}
					setFunction={setIsSecret}
				/>
			}
		</div>
	);
})