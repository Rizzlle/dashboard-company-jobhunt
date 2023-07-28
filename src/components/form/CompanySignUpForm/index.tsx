"use client";

import { signUpSchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { hashPassword } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompanySignUpForm() {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		try {
			setLoading(true);

			const hashedPassword = await hashPassword(values.password);
			const formData = {
				...values,
				password: hashedPassword,
			};

			await fetch("/api/company", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			await router.push("/auth/signin");
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	return (
		<div className="grid gap-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<div className="grid gap-1 space-y-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Name"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-left" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Email"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-left" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-left" />
									</FormItem>
								)}
							/>
							<Button disabled={loading} type="submit">
								Submit
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
