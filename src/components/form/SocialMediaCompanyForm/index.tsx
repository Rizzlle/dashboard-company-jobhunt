"use client";

import { socialMediaSchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TitleForm from "../PostJobForm/TitleForm";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import FieldWrapper from "../PostJobForm/FieldItem";
import FieldDescription from "../PostJobForm/FieldDescription";
import InputFormField from "@/components/helpers/InputFormField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface socialMediaProps {
	facebook: string;
	instagram: string;
	twitter: string;
	linkedin: string;
	youtube: string;
}

interface SocialMediaCompanyFormProps {
	data: socialMediaProps | null | any;
}

const SocialMediaCompanyForm: FC<SocialMediaCompanyFormProps> = ({ data }) => {
	const [isSubmit, setSubmit] = useState<boolean>(false);

	const { toast } = useToast();
	const { data: session } = useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof socialMediaSchema>>({
		resolver: zodResolver(socialMediaSchema),
		defaultValues: {
			facebook: data.facebook,
			instagram: data.instagram,
			linkedin: data.twitter,
			twitter: data.linkedin,
			youtube: data.youtube,
		},
	});

	const onSubmit = async (values: z.infer<typeof socialMediaSchema>) => {
		try {
			setSubmit(true);

			const body = {
				...values,
				companyId: session?.user.id,
			};

			await fetch("/api/company/social-media", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			setSubmit(false);

			await toast({
				title: "Success",
				description: "Edit Social media success",
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
				<FieldWrapper>
					<FieldDescription
						title="Basic Information"
						subtitle="Add elsewhere links to your <br /> company profile. You can add <br /> only username without full https <br /> links."
					/>
					<div className="w-[65%] space-y-6">
						<InputFormField
							form={form}
							name="facebook"
							label="Facebook"
							className="w-[500px]"
							placeholder="https://facebook.com/abc"
						/>
						<InputFormField
							form={form}
							name="twitter"
							label="Twitter"
							className="w-[500px]"
							placeholder="https://twitter.com/abc"
						/>
						<InputFormField
							form={form}
							name="instagram"
							label="Instagram"
							className="w-[500px]"
							placeholder="https://instagram.com/abc"
						/>
						<InputFormField
							form={form}
							name="linkedin"
							label="LinkedIn"
							className="w-[500px]"
							placeholder="https://linkedin.com/abc"
						/>
						<InputFormField
							form={form}
							name="youtube"
							label="Youtube"
							className="w-[500px]"
							placeholder="https://youtube.com/abc"
						/>
					</div>
				</FieldWrapper>

				<Separator />
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
};

export default SocialMediaCompanyForm;
