import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import FieldDescription from "../FieldDescription";
import FieldWrapper from "../FieldItem";
import TitleForm from "../TitleForm";
import InputBenefits from "./InputBenefits";

interface Props {
	form: any;
}

export default function StepThree({ form }: Props) {
	const [benefits, setBenefits] = useState<any>([]);

	const deleteBenefit = (item: any) => {
		const deletedBenefits = benefits.filter(
			(benefit: any) => item !== benefit
		);
		setBenefits([...deletedBenefits]);
		form.setValue("benefits", deletedBenefits);
	};

	const updateBenefits = (item: any) => {
		const newValue: any = [...benefits, item];

		setBenefits(newValue);
		form.setValue("benefits", newValue);
	};

	useEffect(() => {
		setBenefits(form.getValues("benefits"));
	}, [form]);

	return (
		<div
			id="step-3"
			className={cn(
				form.getValues("state") === 3 ? "block" : "hidden",
				"space-y-7"
			)}
		>
			<TitleForm
				title="Basic Information"
				subtitle="List out your top perks and benefits."
			/>
			<Separator />
			<FieldWrapper>
				<FieldDescription
					title="Perks and Benefits"
					subtitle="Encourage more people to apply <br /> by sharing the attractive <br /> rewards and benefits you offer <br /> your employees"
				/>
				<div className="w-[65%]">
					<InputBenefits updateBenefits={updateBenefits} />
					<div className="grid grid-cols-3 gap-5 mt-5">
						{benefits.map((item: any, i: number) => (
							<div
								className="border border-gray-200 rounded-sm p-3 relative"
								key={i}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-10 h-10 text-bluePrimary mb-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
									/>
								</svg>

								<div
									className="absolute top-2 right-2 cursor-pointer"
									onClick={() => deleteBenefit(item)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>

								<div className="text-xl font-semibold mb-3">
									{item.benefit}
								</div>
								<div className="text-gray-500 text-sm">
									{item.description}
								</div>
							</div>
						))}
						<FormField
							control={form.control}
							name="benefits"
							render={({ field }) => (
								<FormItem>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</FieldWrapper>
			<Separator />
		</div>
	);
}
