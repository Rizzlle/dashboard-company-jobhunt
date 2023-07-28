import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CompanySignUpForm from "@/components/CompanySignUpForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: "Sign Up",
};

export default async function NewCompanyPage() {
	const session = await getServerSession(authOptions);

	if (session !== null) {
		return redirect("/dashboard");
	}

	return (
		<>
			<h1 className="text-2xl font-semibold tracking-tight">
				Create your account
			</h1>
			<p className="text-sm text-muted-foreground">
				Enter your email and below to create your account
			</p>
			<CompanySignUpForm />
		</>
	);
}
