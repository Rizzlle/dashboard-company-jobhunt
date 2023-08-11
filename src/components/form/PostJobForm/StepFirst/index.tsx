import InputFormField from "@/components/helpers/InputFormField";
import MultipleInputFormField from "@/components/helpers/MultipleInputFormField";
import RadioFormField from "@/components/helpers/RadioFormField";
import SelectFormField from "@/components/helpers/SelectFormField";
import { Separator } from "@/components/ui/separator";
import { SELECT_JOB_CATEGORIES, SELECT_JOB_TYPE } from "@/constants";
import useJobCategories from "@/hooks/useJobCategories";
import { cn } from "@/lib/utils";
import TitleForm from "../TitleForm";

interface Props {
	form: any;
	skills: [];
}

export default function StepFirst({ form, skills }: Props) {
	const categories = useJobCategories();

	return (
		<div
			id="step-1"
			className={cn(
				form.getValues("state") === 1 ? "block" : "hidden",
				"space-y-7"
			)}
		>
			<TitleForm
				title="Basic Information"
				subtitle="This information will be displayed publicly"
			/>

			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Job Title</div>
					<div className="text-gray-400">
						Job titles must be describe one <br /> position
					</div>
				</div>
				<div>
					<InputFormField
						form={form}
						name="title"
						placeholder="e.g. Software Engineer"
						className="rounded-none py-6 w-[430px]"
						description="At least 80 characters"
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Type of Employment</div>
					<div className="text-gray-400">
						You can select multiple type of <br /> employment
					</div>
				</div>
				<div>
					<RadioFormField
						form={form}
						name="jobType"
						options={SELECT_JOB_TYPE}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Salary</div>
					<div className="text-gray-400">
						Please specify the estimated <br /> salary range for the
						role. *You <br /> can leave this blank
					</div>
				</div>
				<div className="inline-flex items-center">
					<InputFormField
						form={form}
						name="salaryFrom"
						type="number"
						placeholder="$100"
						className="rounded-none"
					/>
					<div className="mx-14 text-gray-500">to</div>
					<InputFormField
						form={form}
						name="salaryTo"
						type="number"
						placeholder="$500"
						className="rounded-none"
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Categories</div>
					<div className="text-gray-400">
						You can select multiple job <br /> categories
					</div>
				</div>
				<div>
					<SelectFormField
						form={form}
						name="categoryId"
						label="Select Job Categories"
						inputClassName="w-[300px]"
						placeholder="Select Job Categories"
						options={categories.data}
					/>
				</div>
			</div>
			<Separator />
			<div className="flex flex-row items-center">
				<div className="w-[35%]">
					<div className="font-semibold">Required Skills</div>
					<div className="text-gray-400">
						Add required skills for the job
					</div>
				</div>
				<div>
					<MultipleInputFormField
						form={form}
						name="requiredSkills"
						label="Add Skills"
						defaultValues={skills}
					/>
				</div>
			</div>
			<Separator />
		</div>
	);
}
