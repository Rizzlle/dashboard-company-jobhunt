"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTableColumnHeader from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";

export type Jobs = {
	id: string;
	roles: string;
	status: string;
	datePosted: string;
	dueDate: string;
	jobType: "Fulltime" | "Freelance" | "Internship";
	applicants: number;
	needs: number;
};

export const columns: ColumnDef<Jobs>[] = [
	{
		accessorKey: "roles",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="roles" />;
		},
		cell: ({ row }) => {
			const job = row.original;

			return <div className="font-semibold">{job.roles}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const job = row.original;

			if (moment().isBefore(job.dueDate)) {
				return (
					<Badge
						variant="outline"
						className="text-green-500 py-2 px-6 rounded-full font-bold border-green-500"
					>
						Live
					</Badge>
				);
			} else {
				return (
					<Badge
						variant="outline"
						className="text-red-500 py-2 px-6 rounded-full font-bold border-red-500"
					>
						Closed
					</Badge>
				);
			}
		},
	},
	{
		accessorKey: "datePosted",
		header: "Date Posted",
		cell: ({ row }) => {
			const job = row.original;

			return moment(job.datePosted).format("DD MMM YYYY");
		},
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const job = row.original;

			return moment(job.dueDate).format("DD MMM YYYY");
		},
	},
	{
		accessorKey: "jobType",
		header: "Job Type",
		cell: ({ row }) => {
			const job = row.original;

			return (
				<Badge
					variant="outline"
					className="text-bluePrimary py-2 px-6 rounded-full font-bold border-bluePrimary"
				>
					{job.jobType}
				</Badge>
			);
		},
	},
	{
		accessorKey: "applicants",
		header: "Applicants",
	},
	{
		accessorKey: "needs",
		header: "Needs",
		cell: ({ row }) => {
			const job = row.original;

			return (
				<div>
					{job.applicants}{" "}
					<span className="text-gray-300">/ {job.needs}</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const job = row.original;

			return (
				<Button variant="ghost" className="h-8 w-8 p-0" asChild>
					<Link href={`/dashboard/job-detail/${job.id}`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</Link>
				</Button>
			);
		},
	},
];
