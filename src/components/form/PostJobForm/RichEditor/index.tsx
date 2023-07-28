import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface Props {
	form?: any;
	name?: string;
}

export default function RichEditor({ form, name }: Props) {
	return (
		<>
			<CKEditor
				editor={ClassicEditor}
				data={form.getValues(name)}
				onChange={(event, editor) => {
					const data = editor.getData();
					form.setValue(name, data);
				}}
			/>
			<FormField
				control={form.control}
				name={name!!}
				render={({ field }) => (
					<FormItem>
						<FormMessage className="mt-3" />
					</FormItem>
				)}
			/>
		</>
	);
}
