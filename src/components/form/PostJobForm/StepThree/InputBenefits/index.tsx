import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef } from "react";

interface Props {
	updateBenefits: (item: any) => void;
}

export default function InputBenefits({ updateBenefits }: Props) {
	const benefitRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const handleSaveBenefit = () => {
		const benefit = benefitRef.current?.value;
		const description = descriptionRef.current?.value;

		if (benefit === "" || description === "") {
			return;
		}

		updateBenefits({
			benefit,
			description,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="border-bluePrimary text-bluePrimary rounded-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4 mr-2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					Add Benefit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Benefit</DialogTitle>
					<DialogDescription>
						Make a new benefit, clicks save when your done
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-8 mb-5">
					<div>
						<Label htmlFor="benefit">Benefit</Label>
						<Input
							id="benefit"
							placeholder="fill your benefit..."
							ref={benefitRef}
						/>
					</div>
					<div>
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="fill your description..."
							ref={descriptionRef}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={handleSaveBenefit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
