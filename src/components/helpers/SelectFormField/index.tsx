import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, { FC } from "react";

export interface OptionsProps {
	label: string;
	value: string | any;
}

interface SelectFormFieldProps {
	form: any;
	name: string;
	label: string;
	options: OptionsProps[];
	placeholder?: string;
	inputClassName?: string;
}

const SelectFormField: FC<SelectFormFieldProps> = ({
	form,
	name,
	label,
	placeholder,
	inputClassName,
	options,
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger className={inputClassName}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((item: OptionsProps, i: number) => (
								<SelectItem key={i} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectFormField;
