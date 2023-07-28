import React from "react";

interface Props {
	title: string;
	subtitle: string;
}

export default function FieldDescription({ title, subtitle }: Props) {
	return (
		<div className="w-[35%]">
			<div className="font-semibold">{title}</div>
			<div
				className="text-gray-400"
				dangerouslySetInnerHTML={{ __html: subtitle }}
			></div>
		</div>
	);
}
