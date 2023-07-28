import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";

export default function Applicants() {
	return (
		<div>
			<DataTable columns={columns} data={[]} filterColumns="name" />
		</div>
	);
}
