import React from "react";
import { Button } from "./button";

interface Props {
	column: any;
	title: any;
}

export default function DataTableColumnHeader({ column, title }: Props) {
	return (
		<Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			{title}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="ml-2 w-3 h-3"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
				/>
			</svg>
		</Button>
	);
}
