import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Dashboard",
	other: {
		charset: "utf-8",
	},
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<div className="border-t">
				<div className="bg-background">
					<div className="flex flex-row">
						<Sidebar className="hidden lg:block w-[18%]" />
						<div className="col-span-3 overflow-auto lg:col-span-5 lg:border-1 w-[82%]">
							<div className="px-6 py-6 lg:px-8">
								<Header />
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
