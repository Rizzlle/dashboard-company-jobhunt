import { cn } from "@/lib/utils";
import React from "react";
import TitleForm from "../TitleForm";
import { Separator } from "@/components/ui/separator";
import FieldWrapper from "../FieldItem";
import FieldDescription from "../FieldDescription";
import RichEditor from "../RichEditor";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface Props {
	form: any;
}

export default function StepSecond({ form }: Props) {
	return (
		<div
			id="step-2"
			className={cn(
				form.getValues("state") === 2 ? "block" : "hidden",
				"space-y-7"
			)}
		>
			<TitleForm
				title="Details"
				subtitle="Add the description of the job, responsibilities, who you are, and nice-to-haves."
			/>
			<Separator />
			<FieldWrapper>
				<FieldDescription
					title="Job Descriptions"
					subtitle="Job titles must be describe one <br /> position"
				/>
				<div className="w-[65%]">
					<RichEditor
						form={form}
						name="jobDescription"
						key="jobDescription"
					/>
					<FormField
						control={form.control}
						name="jobDescription"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</FieldWrapper>
			<Separator />
			<FieldWrapper>
				<FieldDescription
					title="Responsibilities"
					subtitle="Outline the core responsibilities <br /> of the position"
				/>
				<div className="w-[65%]">
					<RichEditor
						form={form}
						key="responsibility"
						name="responsibility"
					/>
					<FormField
						control={form.control}
						name="responsibility"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</FieldWrapper>
			<Separator />
			<FieldWrapper>
				<FieldDescription
					title="Who You Are"
					subtitle="Add your preferred candidates <br /> qualifications"
				/>
				<div className="w-[65%]">
					<RichEditor form={form} key="whoYouAre" name="whoYouAre" />
					<FormField
						control={form.control}
						name="whoYouAre"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</FieldWrapper>
			<Separator />
			<FieldWrapper>
				<FieldDescription
					title="Nice-To-Haves"
					subtitle="Add nice-to-have skills and <br /> qualifications for the role to <br /> encourage a more diverse set of <br /> candidates to apply"
				/>
				<div className="w-[65%] space-y-2">
					<RichEditor
						form={form}
						key="niceToHaves"
						name="NiceTohaves"
					/>
					<FormField
						control={form.control}
						name="NiceTohaves"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</FieldWrapper>
			<Separator />
		</div>
	);
}
