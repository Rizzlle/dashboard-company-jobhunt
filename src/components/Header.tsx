"use client";

import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Header() {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<div className="pb-3 mb-8 border-b border-gray-200 flex flex-row items-center justify-between">
			<div>
				<div>Company</div>
				<div className="font-semibold">{session?.user?.name}</div>
			</div>
			<div>
				<Button
					onClick={() => router.push("/dashboard/post-a-job")}
					className="bg-bluePrimary rounded-none py-3 px-6"
				>
					<PlusIcon className="w-4 h-4 mr-2" /> Post a Job
				</Button>
			</div>
		</div>
	);
}
