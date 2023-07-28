import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { FC, useRef, useState } from "react";

interface MultipleInputFormFieldProps {
	form: any;
	name: string;
	label: string;
	placeholder?: string;
	defaultValues: string[];
}

const MultipleInputFormField: FC<MultipleInputFormFieldProps> = ({
	form,
	name,
	label,
	placeholder,
	defaultValues = [],
}) => {
	const [isHide, setHide] = useState<boolean>(false);
	const [values, setValues] = useState<string[]>(defaultValues);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSaveValue = () => {
		const value = inputRef.current?.value;

		if (value === "") {
			return;
		}

		const newValue: any = [...values, value];

		setValues(newValue);

		form.setValue(name, newValue);
	};

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="block">{label}</FormLabel>
					<FormControl>
						<>
							<Button
								type="button"
								variant="outline"
								className="text-bluePrimary mb-2"
								onClick={() => setHide(!isHide)}
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
								{label}
							</Button>
							{isHide && (
								<div className="my-4 flex flex-row gap-4">
									<Input
										ref={inputRef}
										placeholder={placeholder}
										className="w-[246px]"
									/>
									<Button
										type="button"
										onClick={handleSaveValue}
										className="bg-bluePrimary"
									>
										Save
									</Button>
								</div>
							)}
							<div className="space-x-3">
								{values.map((item: string, key: number) => (
									<Badge
										className="border-none text-bluePrimary bg-blue-100/60 px-3 py-2 rounded-none cursor-pointer"
										variant={"outline"}
										key={key}
										onClick={() =>
											setValues(
												values.filter(
													(value: string) =>
														item !== value
												)
											)
										}
									>
										{item}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4 ml-2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</Badge>
								))}
							</div>
						</>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default MultipleInputFormField;
