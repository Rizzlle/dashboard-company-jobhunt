import React, { ReactNode } from "react";

interface Props {
	title: string;
	content: string;
}

export default function ContentDescription({ title, content }: Props) {
	return (
		<div>
			<div className="text-2xl font-semibold">{title}</div>
			<div
				className="text-gray-500 mt-4"
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	);
}
