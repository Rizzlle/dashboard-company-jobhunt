"use client";

import InputFormField from "@/components/helpers/InputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { teamCompanySchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TeamCompanyFormProps {}

const TeamCompanyForm: FC<TeamCompanyFormProps> = ({}) => {
	const [isSubmit, setSubmit] = useState<boolean>(false);

	const { toast } = useToast();
	const { data: session } = useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof teamCompanySchema>>({
		resolver: zodResolver(teamCompanySchema),
		defaultValues: {
			name: "",
			position: "",
			instagram: "",
			linkedin: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof teamCompanySchema>) => {
		try {
			setSubmit(true);

			const body = {
				...values,
				companyId: session?.user.id,
			};

			await fetch("/api/company/teams", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			setSubmit(false);

			await toast({
				title: "Success",
				description: "Add Team success",
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<InputFormField
					form={form}
					name="name"
					label="Name"
					placeholder="Harison Ford"
				/>
				<InputFormField
					form={form}
					name="position"
					label="Position"
					placeholder="CEO"
				/>
				<InputFormField
					form={form}
					name="instagram"
					label="Instagram"
					placeholder="https://instagram.com/abc"
				/>
				<InputFormField
					form={form}
					name="linkedin"
					label="Linkedin"
					placeholder="https://linkedin.com/abc"
				/>
				<Button
					type="submit"
					disabled={isSubmit}
					className="ml-auto text-right bg-bluePrimary"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default TeamCompanyForm;
