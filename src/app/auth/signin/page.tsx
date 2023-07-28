import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CompanySignInForm from "@/components/form/CompanySignInForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const metadata: Metadata = {
	title: "Sign In",
};

export default async function SigninPage() {
	const session = await getServerSession(authOptions);

	if (session !== null) {
		return redirect("/dashboard");
	}

	return (
		<>
			<h1 className="text-2xl font-semibold tracking-tight">
				Login your account
			</h1>
			<p className="text-sm text-muted-foreground">
				Enter your email below to access dashboard
			</p>
			<CompanySignInForm />
		</>
	);
}
