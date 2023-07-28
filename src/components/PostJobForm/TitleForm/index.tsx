import React from "react";

interface Props {
	title: string;
	subtitle: string;
}

export default function TitleForm({ subtitle, title }: Props) {
	return (
		<div>
			<div className="text-lg font-semibold">{title}</div>
			<div className="text-gray-400">{subtitle}</div>
		</div>
	);
}
