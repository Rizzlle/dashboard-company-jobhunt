import { DataTable } from "@/components/ui/data-table";
import prisma from "../../../../lib/prisma";
import { columns } from "./columns";

export const revalidate = 0;

async function getData() {
	const data = await prisma.job.findMany();

	return data;
}

export default async function JobListing() {
	const data = await getData();

	return (
		<div>
			<div className="text-2xl font-semibold">Job Listing</div>
			<div className="font-semibold text-gray-400 text-sm">
				Here is your job listings statistic report from July 19 - July
				25.
			</div>

			<div className="mt-8">
				<DataTable
					columns={columns}
					data={data}
					filterColumns="roles"
				/>
			</div>
		</div>
	);
}
