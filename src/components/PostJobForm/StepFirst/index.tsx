import { cn } from "@/lib/utils";
import React, { Ref, useRef, useState } from "react";
import TitleForm from "../TitleForm";
import { Separator } from "@/components/ui/separator";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
	form: any;
	skills: [];
	setSkills: (val: any) => void;
	hideSkill: boolean;
	setHideSkill: () => void;
	inputSkillRef: Ref<HTMLInputElement> | undefined;
	handleSaveSkill: () => void;
}

export default function StepFirst({
	form,
	hideSkill,
	setHideSkill,
	setSkills,
	skills,
	inputSkillRef,
	handleSaveSkill,
}: Props) {
	return (
		<div
			id="step-1"
			className={cn(
				form.getValues("state") === 1 ? "block" : "hidden",
				"space-y-7"
			)}
		>
			<TitleForm
				title="Basic Information"
				subtitle="This information will be displayed publicly"
			/>

			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Job Title</div>
					<div className="text-gray-400">
						Job titles must be describe one <br /> position
					</div>
				</div>
				<div>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="e.g. Software Engineer"
										className="rounded-none py-6 w-[430px]"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									At least 80 characters
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Type of Employment</div>
					<div className="text-gray-400">
						You can select multiple type of <br /> employment
					</div>
				</div>
				<div>
					<FormField
						control={form.control}
						name="jobType"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem
													className="rounded-none w-6 h-6"
													value="fulltime"
												/>
											</FormControl>
											<FormLabel className="font-normal">
												Full-Time
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem
													className="rounded-none w-6 h-6"
													value="parttime"
												/>
											</FormControl>
											<FormLabel className="font-normal">
												Part-Time
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem
													className="rounded-none w-6 h-6"
													value="remote"
												/>
											</FormControl>
											<FormLabel className="font-normal">
												Remote
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem
													className="rounded-none w-6 h-6"
													value="internship"
												/>
											</FormControl>
											<FormLabel className="font-normal">
												Internship
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Salary</div>
					<div className="text-gray-400">
						Please specify the estimated <br /> salary range for the
						role. *You <br /> can leave this blank
					</div>
				</div>
				<div className="inline-flex items-center">
					<FormField
						control={form.control}
						name="salaryFrom"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="number"
										placeholder="$1000"
										className="rounded-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mx-14 text-gray-500">to</div>
					<FormField
						control={form.control}
						name="salaryTo"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="number"
										placeholder="$1000"
										className="rounded-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Categories</div>
					<div className="text-gray-400">
						You can select multiple job <br /> categories
					</div>
				</div>
				<div>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select Job Categories</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-[300px]">
											<SelectValue placeholder="Select Job Categories" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Marketing">
											Marketing
										</SelectItem>
										<SelectItem value="Design">
											Design
										</SelectItem>
										<SelectItem value="Developer">
											Developer
										</SelectItem>
										<SelectItem value="Etc">Etc</SelectItem>
									</SelectContent>
									<FormMessage />
								</Select>
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Required Skills</div>
					<div className="text-gray-400">
						Add required skills for the job
					</div>
				</div>
				<div>
					<Button
						type="button"
						variant="outline"
						className="text-bluePrimary mb-2"
						onClick={setHideSkill}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Add Skills
					</Button>
					{hideSkill && (
						<div className="my-4 flex flex-row gap-4">
							<Input
								ref={inputSkillRef}
								placeholder="add skill"
							/>
							<Button
								type="button"
								onClick={handleSaveSkill}
								className="bg-bluePrimary"
							>
								Save
							</Button>
						</div>
					)}

					<div className="space-x-3">
						{skills.map((item: string, key: number) => (
							<Badge
								className="border-none text-bluePrimary bg-blue-100/60 px-3 py-2 rounded-none cursor-pointer"
								variant={"outline"}
								key={key}
								onClick={() =>
									setSkills(
										skills.filter(
											(skill: string) => item !== skill
										)
									)
								}
							>
								{item}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4 ml-2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</Badge>
						))}
					</div>

					<FormField
						control={form.control}
						name="requiredSkills"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<Separator />
		</div>
	);
}
