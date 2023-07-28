import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, InputHTMLAttributes } from "react";

interface InputFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	form: any;
	name: string;
	label?: string;
	description?: string;
}

const InputFormField: FC<InputFormFieldProps> = ({
	form,
	name,
	label,
	description,
	...props
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input placeholder="" {...props} {...field} />
					</FormControl>
					{description && (
						<FormDescription>{description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputFormField;
