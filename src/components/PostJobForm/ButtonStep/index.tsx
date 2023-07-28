import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
	form: any;
	nextStep: () => {};
	skills: [];
}

export default function ButtonStep({ form, nextStep, skills }: Props) {
	const prevStep = () => {
		form.setValue("state", form.getValues("state") - 1);
		form.trigger();
	};

	return (
		<div>
			{form.getValues("state") === 3 ? (
				<div className="flex justify-end">
					<Button
						type="submit"
						className="bg-bluePrimary text-white rounded-none py-6 px-9"
					>
						Do a Review
					</Button>
				</div>
			) : (
				<div
					className={cn(
						"flex",
						form.getValues("state") > 1
							? "justify-between"
							: "justify-end"
					)}
				>
					{form.getValues("state") > 1 && (
						<Button
							type="button"
							onClick={prevStep}
							className="bg-bluePrimary text-white rounded-none py-6 px-9"
						>
							Prev Step
						</Button>
					)}
					<Button
						type="button"
						onClick={nextStep}
						className="bg-bluePrimary text-white rounded-none py-6 px-9"
					>
						Next Step
					</Button>
				</div>
			)}
		</div>
	);
}
