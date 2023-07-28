import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Props {
	state: number;
}

const StyleStepper = {
	active: {
		iconDiv: "text-white bg-bluePrimary w-max p-3 rounded-full",
		icon: "w-10 h-10",
		textStep: "text-bluePrimary",
		textInformation: "text-lg font-semibold text-[#25324B]",
	},
	nonActive: {
		iconDiv: "text-white bg-[#E9EBFD] w-max p-3 rounded-full",
		icon: "w-10 h-10 text-gray-500",
		textStep: "text-gray-300",
		textInformation: "text-lg font-semibold text-gray-500",
	},
};

export default function Stepper({ state }: Props) {
	return (
		<div className="border border-gray-200 p-5 mt-8">
			<div className="flex justify-between h-14 items-center space-x-4">
				<div className="flex items-center gap-3 cursor-pointer">
					<div
						className={cn(
							state >= 1
								? StyleStepper.active.iconDiv
								: StyleStepper.nonActive.iconDiv
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={cn(
								state >= 1
									? StyleStepper.active.icon
									: StyleStepper.nonActive.icon
							)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
							/>
						</svg>
					</div>
					<div>
						<div
							className={cn(
								state >= 1
									? StyleStepper.active.textStep
									: StyleStepper.nonActive.textStep
							)}
						>
							Step 1/3
						</div>
						<div
							className={cn(
								state >= 1
									? StyleStepper.active.textInformation
									: StyleStepper.nonActive.textInformation
							)}
						>
							Job Information
						</div>
					</div>
				</div>
				<Separator orientation="vertical" />
				<div className="flex items-center gap-3 cursor-pointer">
					<div
						className={cn(
							state >= 2
								? StyleStepper.active.iconDiv
								: StyleStepper.nonActive.iconDiv
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={cn(
								state >= 2
									? StyleStepper.active.icon
									: StyleStepper.nonActive.icon
							)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
							/>
						</svg>
					</div>
					<div>
						<div
							className={cn(
								state >= 2
									? StyleStepper.active.textStep
									: StyleStepper.nonActive.textStep
							)}
						>
							Step 2/3
						</div>
						<div
							className={cn(
								state >= 2
									? StyleStepper.active.textInformation
									: StyleStepper.nonActive.textInformation
							)}
						>
							Job Description
						</div>
					</div>
				</div>
				<Separator orientation="vertical" />
				<div className="flex items-center gap-3 cursor-pointer">
					<div
						className={cn(
							state === 3
								? StyleStepper.active.iconDiv
								: StyleStepper.nonActive.iconDiv
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={cn(
								state === 3
									? StyleStepper.active.icon
									: StyleStepper.nonActive.icon
							)}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
							/>
						</svg>
					</div>
					<div>
						<div
							className={cn(
								state === 3
									? StyleStepper.active.textStep
									: StyleStepper.nonActive.textStep
							)}
						>
							Step 3/3
						</div>
						<div
							className={cn(
								state === 3
									? StyleStepper.active.textInformation
									: StyleStepper.nonActive.textInformation
							)}
						>
							Perks & Benefit
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
