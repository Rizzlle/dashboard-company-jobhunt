"use client";

import { signInSchema } from "@/lib/formschema";
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

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";

export default function CompanySignInForm() {
	const [isLoading, setLoading] = useState<boolean>(false);

	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signInSchema>) {
		setLoading(true);
		const authenticated = await signIn("credentials", {
			...values,
			redirect: false,
		});
		setLoading(false);

		if (authenticated?.error) {
			toast({
				title: "Error occured",
				description: "email or password maybe wrong",
			});
			return;
		}

		await router.push("/dashboard/");
	}

	return (
		<div className="grid gap-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<div className="grid gap-1 space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="email"
												type="email"
												autoCapitalize="none"
												autoComplete="email"
												autoCorrect="off"
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
												placeholder="password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-left" />
									</FormItem>
								)}
							/>
							<Button disabled={isLoading} type="submit">
								Sign In
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
