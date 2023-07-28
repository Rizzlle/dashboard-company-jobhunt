"use client";

import { Button } from "@/components/ui/button";
import DataTableColumnHeader from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

export type Applicants = {
	name: string;
	stage: string;
	applyDate: string;
};

export const columns: ColumnDef<Applicants>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="name" />;
		},
		cell: ({ row }) => {
			const applicant = row.original;

			return <div>Jake Gyll</div>;
		},
	},
	{
		accessorKey: "stage",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Roles
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
		},
	},
	{
		accessorKey: "applyDate",
		header: ({ column }) => {
			return (
				<DataTableColumnHeader column={column} title="Applied Date" />
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const applicant = row.original;

			return <Button>See Application</Button>;
		},
	},
];
