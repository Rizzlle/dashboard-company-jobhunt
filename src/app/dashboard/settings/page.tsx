import OverviewCompanyForm from "@/components/OverviewCompanyForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const revalidate = 0;

async function getData(id: string) {
	const data = await prisma.companyoverview.findFirst({
		where: {
			companyId: id
		}
	});

	return data;
}

export default async function SettingsPage() {
	const session = await getServerSession(authOptions)
	const data = await getData(session?.user.id)

	return (
		<div>
			<div className="inline-flex items-center gap-5 mb-5">
				<div>
					<div className="text-2xl font-semibold mb-1">Settings</div>
				</div>
			</div>
			<Tabs defaultValue="overview" className="">
				<TabsList className="mb-8">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="socialLink">Social Links</TabsTrigger>
					<TabsTrigger value="teams">Teams</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<OverviewCompanyForm data={data!!} />
				</TabsContent>
				<TabsContent value="socialLink">
					<div>social links</div>
				</TabsContent>
				<TabsContent value="teams">
					<div>teams</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
