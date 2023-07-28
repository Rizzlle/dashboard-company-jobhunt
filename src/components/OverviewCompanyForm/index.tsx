"use client";

import { overviewSchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FieldDescription from "../PostJobForm/FieldDescription";
import FieldWrapper from "../PostJobForm/FieldItem";
import TitleForm from "../PostJobForm/TitleForm";
import CustomUpload from "../helpers/CustomUpload";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import RichEditor from "../PostJobForm/RichEditor";
import { useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { supabaseUploadImg } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";

interface profileProps {
	id: string;
	image: string;
	name: string;
	website: string;
	location: string;
	employee: string;
	industry: string;
	dateFounded: Date;
	techStack: string[];
	description: string;
	companyId: string | null;
}

interface Props {
	data: profileProps;
}

export default function OverviewCompanyForm({ data }: Props) {
	const [isHide, setHide] = useState<boolean>(false);
	const [isSubmit, setSubmit] = useState<boolean>(false);
	const [techs, setTechs] = useState<string[]>(data.techStack);
	const inputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();
	const { data: session } = useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof overviewSchema>>({
		resolver: zodResolver(overviewSchema),
		defaultValues: {
			description: data.description,
			employee: data.employee,
			image: data.image,
			industry: data.industry,
			location: data.location,
			name: data.name,
			techStack: data.techStack,
			website: data.website,
			dateFounded: data.dateFounded,
		},
	});

	const onSubmit = async (values: z.infer<typeof overviewSchema>) => {
		try {
			setSubmit(true);
			let filename = "";

			if (typeof values.image === "object") {
				const uploadImg = await supabaseUploadImg(
					values.image,
					"company"
				);
				filename = uploadImg.filename;
			} else {
				filename = values.image;
			}

			const body = {
				...values,
				image: filename,
				companyId: session?.user.id,
			};

			await fetch("/api/company/overview", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			setSubmit(false);

			await toast({
				title: "Success",
				description: "Edit profile success",
			});
			await router.refresh();
		} catch (error) {
			setSubmit(false);
			console.log(error);
			await toast({
				title: "Error",
				description: "Something wrong, please try again",
			});
		}
	};

	const handleSaveTech = () => {
		const value = inputRef.current?.value;

		if (value === "") {
			return;
		}

		const newValue: any = [...techs, value];

		setTechs(newValue);

		form.setValue("techStack", newValue);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<TitleForm
					title="Basic Information"
					subtitle="This is company information that you can update anytime"
				/>

				<Separator />

				<FieldWrapper>
					<FieldDescription
						title="Company Logo"
						subtitle="This image will be shown publicly <br /> as company logo."
					/>
					<div className="w-[65%]">
						<CustomUpload form={form} name="image" />
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormMessage className="mt-3" />
								</FormItem>
							)}
						/>
					</div>
				</FieldWrapper>

				<Separator />

				<FieldWrapper>
					<FieldDescription
						title="Company Details"
						subtitle="Introduce your company core <br /> info quickly to users by fill up <br /> company details"
					/>
					<div className="w-[65%] space-y-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company name</FormLabel>
									<FormControl>
										<Input
											className="w-[500px]"
											placeholder="Job Hunt Enterprise"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input
											className="w-[500px]"
											placeholder="https://jobhunt.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-[500px]">
												<SelectValue placeholder="Select a location" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Indonesia">
												Indonesia
											</SelectItem>
											<SelectItem value="Malaysia">
												Malaysia
											</SelectItem>
											<SelectItem value="Singapura">
												Singapura
											</SelectItem>
											<SelectItem value="Thailand">
												Thailand
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="inline-flex gap-2">
							<FormField
								control={form.control}
								name="employee"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Employee</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-[246px]">
													<SelectValue placeholder="Select a employee" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="1-50">
													1-50
												</SelectItem>
												<SelectItem value="50-100">
													50-100
												</SelectItem>
												<SelectItem value="100-150">
													100-150
												</SelectItem>
												<SelectItem value=">200">
													{">"}200
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="industry"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Industry</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-[246px]">
													<SelectValue placeholder="Select a employee" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Technology">
													Technology
												</SelectItem>
												<SelectItem value="Economy">
													Economy
												</SelectItem>
												<SelectItem value="Creative">
													Creative
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="dateFounded"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="block">
										Date Founded
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-[500px] pl-3 text-left font-normal",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() ||
													date <
														new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="techStack"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="block">
										Tech Stack
									</FormLabel>
									<FormControl>
										<>
											<Button
												type="button"
												variant="outline"
												className="text-bluePrimary mb-2"
												onClick={() => setHide(!isHide)}
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
												Add Techstack
											</Button>
											{isHide && (
												<div className="my-4 flex flex-row gap-4">
													<Input
														ref={inputRef}
														placeholder="add skill"
														className="w-[246px]"
													/>
													<Button
														type="button"
														onClick={handleSaveTech}
														className="bg-bluePrimary"
													>
														Save
													</Button>
												</div>
											)}
											<div className="space-x-3">
												{techs.map(
													(
														item: string,
														key: number
													) => (
														<Badge
															className="border-none text-bluePrimary bg-blue-100/60 px-3 py-2 rounded-none cursor-pointer"
															variant={"outline"}
															key={key}
															onClick={() =>
																setTechs(
																	techs.filter(
																		(
																			tech: string
																		) =>
																			item !==
																			tech
																	)
																)
															}
														>
															{item}
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
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
													)
												)}
											</div>
										</>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</FieldWrapper>

				<Separator />

				<FieldWrapper>
					<FieldDescription
						title="About Company"
						subtitle="Brief description for your <br />company. URLs are hyperlinked."
					/>
					<div className="w-[65%]">
						<RichEditor
							form={form}
							key="description"
							name="description"
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormMessage className="mt-3" />
								</FormItem>
							)}
						/>
					</div>
				</FieldWrapper>
				<div className="flex justify-end">
					<Button
						disabled={isSubmit}
						className="bg-bluePrimary text-white rounded-none py-6 px-9"
					>
						Save Changes
					</Button>
				</div>
			</form>
		</Form>
	);
}
