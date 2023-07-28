import React from "react";
import prisma from "../../../../../lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/job-detail/Applicants";
import JobDetails from "@/components/job-detail/JobDetails";
import { useRouter } from "next/router";
import Link from "next/link";

export const revalidate = 0;

async function getData(id: string) {
	const data = await prisma.job.findFirst({
		where: {
			id,
		},
	});

	return data;
}

export default async function JobDetail({
	params,
}: {
	params: { id: string };
}) {
	const data = await getData(params.id);

	return (
		<div>
			<div className="inline-flex items-center gap-5 mb-5">
				<div>
					<Link href="/dashboard/job-listing">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-9 h-9"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
							/>
						</svg>
					</Link>
				</div>
				<div>
					<div className="text-2xl font-semibold mb-1">
						{data?.roles}
					</div>
					<div>
						{data?.jobCategory} · {data?.jobType} ·{" "}
						{data?.applicants}
						<span className="text-gray-500">
							/{data?.needs} Hired
						</span>
					</div>
				</div>
			</div>
			<Tabs defaultValue="applicants" className="">
				<TabsList className="mb-8">
					<TabsTrigger value="applicants">Applicants</TabsTrigger>
					<TabsTrigger value="jobDetails">Job Details</TabsTrigger>
				</TabsList>
				<TabsContent value="applicants">
					<Applicants />
				</TabsContent>
				<TabsContent value="jobDetails">
					<JobDetails job={data} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
