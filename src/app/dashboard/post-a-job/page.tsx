"use client";

import PostJobForm from "@/components/form/PostJobForm";
import SWRProvider from "@/providers/SWRProvider";

export default function PostJob() {
	return (
		<div>
			<div className="inline-flex items-center gap-2 cursor-pointer hover:text-bluePrimary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				<span className="text-2xl font-semibold">Post a Job</span>
			</div>

			<SWRProvider>
				<PostJobForm />
			</SWRProvider>
		</div>
	);
}
