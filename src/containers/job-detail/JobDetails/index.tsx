"use client";

import React from "react";
import ContentDescription from "./ContentDescription";
import { Progress } from "@/components/ui/progress";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Props {
	job: any;
}

export default function JobDetails({ job }: Props) {
	return (
		<div>
			<div className="grid grid-cols-3 w-full gap-5">
				<div className="col-span-2 space-y-10">
					<ContentDescription
						title="Description"
						content={job?.description}
					/>
					<ContentDescription
						title="Responsibilities"
						content={job?.responsibility}
					/>
					<ContentDescription
						title="Who You Are"
						content={job?.whoYouAre}
					/>
					<ContentDescription
						title="Nice-To-Haves"
						content={job?.niceToHaves}
					/>
				</div>
				<div className="">
					<div className="text-2xl font-semibold">
						About this role
					</div>

					<div className="bg-gray-100 p-3 text-center mt-6">
						{job?.applicants}{" "}
						<span className="text-gray-500">
							of {job?.needs} capacity
						</span>
						<Progress
							className="mt-3"
							value={(job?.applicants / job?.needs) * 100}
						/>
					</div>

					<div className="mb-10">
						<div className="flex justify-between mt-5">
							<div className="text-gray-500">Apply Before</div>
							<div className="font-semibold">
								{moment(job?.dueDate).format("DD MMM YYYY")}
							</div>
						</div>
						<div className="flex justify-between mt-5">
							<div className="text-gray-500">Job Posted On</div>
							<div className="font-semibold">
								{moment(job?.datePosted).format("DD MMM YYYY")}
							</div>
						</div>
						<div className="flex justify-between mt-5">
							<div className="text-gray-500">Job Type</div>
							<div className="font-semibold">{job?.jobType}</div>
						</div>
						<div className="flex justify-between mt-5">
							<div className="text-gray-500">Salary</div>
							<div className="font-semibold">
								${job?.salaryFrom}-${job?.salaryTo} USD
							</div>
						</div>
					</div>

					<Separator />

					<div className="my-10">
						<div className="text-2xl font-semibold mb-4">
							Categories
						</div>
						<Badge className="rounded-full py-2 px-5 text-green-500 bg-green-100">
							{job?.jobCategory}
						</Badge>
					</div>

					<Separator />

					<div className="my-10">
						<div className="text-2xl font-semibold mb-4">
							Required Skills
						</div>
						<div className="space-x-5">
							{job?.requiredSkills.map(
								(item: string, i: number) => (
									<Badge
										className="bg-blue-100 py-2 px-4 rounded-none text-bluePrimary"
										key={i}
									>
										{item}
									</Badge>
								)
							)}
						</div>
					</div>
				</div>
			</div>
			<Separator className="my-8" />
			<div>
				<div className="text-2xl font-semibold">Perks & Benefits</div>
				<div className="text-gray-500">
					This job comes with several perks and benefits
				</div>

				<div className="grid grid-cols-4 gap-5 mt-9">
					{job?.benefits.map((item: any, i: number) => (
						<div key={i}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-10 h-10 text-bluePrimary mb-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
								/>
							</svg>
							<div className="text-lg font-semibold mb-3">
								{item.benefit}
							</div>
							<div className="text-gray-500">
								{item.description}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
