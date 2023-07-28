import OverviewCompanyForm from "@/components/form/OverviewCompanyForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SocialMediaCompanyForm from "@/components/form/SocialMediaCompanyForm";
import TeamCompany from "@/containers/TeamCompany";

export const revalidate = 0;

async function getData(id: string) {
	const data = await prisma.company.findFirst({
		where: {
			id: id,
		},
		include: {
			companyOverview: true,
			companySocialMedia: true,
			companyTeam: true,
		},
	});

	return data;
}

export default async function SettingsPage() {
	const session = await getServerSession(authOptions);
	const data = await getData(session?.user.id);

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
					<OverviewCompanyForm data={data?.companyOverview[0]} />
				</TabsContent>
				<TabsContent value="socialLink">
					<SocialMediaCompanyForm
						data={data?.companySocialMedia[0]}
					/>
				</TabsContent>
				<TabsContent value="teams">
					<TeamCompany data={data?.companyTeam} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
