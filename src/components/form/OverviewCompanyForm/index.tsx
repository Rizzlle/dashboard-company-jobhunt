"use client";

import DatePickerFormField from "@/components/helpers/DatePickerFormField";
import InputFormField from "@/components/helpers/InputFormField";
import MultipleInputFormField from "@/components/helpers/MultipleInputFormField";
import SelectFormField from "@/components/helpers/SelectFormField";
import {
	SELECT_EMPLOYEE_COMPANY,
	SELECT_INDUSTRY_COMPANY,
	SELECT_LOCATION_COMPANY,
} from "@/constants";
import { overviewSchema } from "@/lib/formschema";
import { supabaseUploadImg } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomUpload from "../../helpers/CustomUpload";
import { Button } from "../../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
import { Separator } from "../../ui/separator";
import { useToast } from "../../ui/use-toast";
import FieldDescription from "../PostJobForm/FieldDescription";
import FieldWrapper from "../PostJobForm/FieldItem";
import RichEditor from "../PostJobForm/RichEditor";
import TitleForm from "../PostJobForm/TitleForm";

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
	data: profileProps | null | any;
}

export default function OverviewCompanyForm({ data }: Props) {
	const [isSubmit, setSubmit] = useState<boolean>(false);

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
						<InputFormField
							form={form}
							name="name"
							label="Company name"
							className="w-[500px]"
							placeholder="Job Hunt Enterprise"
						/>
						<InputFormField
							form={form}
							name="website"
							label="Website"
							className="w-[500px]"
							placeholder="https://jobhunt.com"
						/>
						<SelectFormField
							form={form}
							name="location"
							label="Location"
							inputClassName="w-[500px]"
							placeholder="Select a location"
							options={SELECT_LOCATION_COMPANY}
						/>
						<div className="inline-flex gap-2">
							<SelectFormField
								form={form}
								name="employee"
								label="Employee"
								inputClassName="w-[246px]"
								placeholder="Select a employee"
								options={SELECT_EMPLOYEE_COMPANY}
							/>
							<SelectFormField
								form={form}
								name="industry"
								label="Industry"
								inputClassName="w-[246px]"
								placeholder="Select a industry"
								options={SELECT_INDUSTRY_COMPANY}
							/>
						</div>
						<DatePickerFormField
							form={form}
							name="dateFounded"
							label="Date Founded"
						/>
						<MultipleInputFormField
							form={form}
							name="techStack"
							defaultValues={data.techStack}
							label="Add Techstack"
							placeholder="add tech stack"
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
