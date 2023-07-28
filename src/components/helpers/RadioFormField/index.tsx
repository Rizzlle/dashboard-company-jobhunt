import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";
import { OptionsProps } from "../SelectFormField";

interface RadioFormFieldProps {
	form: any;
	name: string;
	options: OptionsProps[];
}

const RadioFormField: FC<RadioFormFieldProps> = ({ form, name, options }) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{options.map((item: OptionsProps, i: number) => (
								<FormItem
									key={i}
									className="flex items-center space-x-3 space-y-0"
								>
									<FormControl>
										<RadioGroupItem
											className="rounded-none w-6 h-6"
											value={item.value}
										/>
									</FormControl>
									<FormLabel className="font-normal">
										{item.label}
									</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default RadioFormField;
