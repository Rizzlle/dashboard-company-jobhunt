"use client";

import { jobFormSchema } from "@/lib/formschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../ui/form";
import ButtonStep from "./ButtonStep";
import StepFirst from "./StepFirst";
import StepSecond from "./StepSecond";
import StepThree from "./StepThree";
import Stepper from "./Stepper";

const defaultValueBenefits = [
	{
		benefit: "Full Healthcare",
		description:
			"We believe in thriving communities and that starts with our team being happy and healthy.",
	},
	{
		benefit: "Unlimited Vacation",
		description:
			"We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
	},
	{
		benefit: "Skill Development",
		description:
			"We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
	},
];

export default function PostJobForm() {
	const router = useRouter();
	const { data: session } = useSession();

	const [hideSkill, setHideSkill] = useState<boolean>(false);
	const [skills, setSkills] = useState<any>([]);

	const inputSkillRef = useRef<HTMLInputElement>(null);

	const updateHideSkill = () => {
		setHideSkill(!hideSkill);
	};

	const updateSkills = (item: any) => {
		setSkills(skills.filter((skill: string) => item !== skill));
	};

	const handleSaveSkill = () => {
		const value = inputSkillRef.current?.value;

		if (value === "") {
			return;
		}

		const newValue: any = [...skills, value];

		setSkills(newValue);

		form.setValue("requiredSkills", newValue);
	};

	const form = useForm<z.infer<typeof jobFormSchema>>({
		resolver: zodResolver(jobFormSchema),
		defaultValues: {
			state: 1,
			title: "",
			jobType: undefined,
			salaryFrom: undefined,
			salaryTo: undefined,
			category: undefined,
			requiredSkills: [],
			jobDescription: undefined,
			NiceTohaves: undefined,
			responsibility: undefined,
			whoYouAre: undefined,
			benefits: defaultValueBenefits,
		},
	});

	const onSubmit = async (values: z.infer<typeof jobFormSchema>) => {
		try {
			const body = {
				applicants: 0,
				needs: 10,
				description: values.jobDescription,
				dueDate: moment().add(1, "M").toDate(),
				jobCategory: values.category,
				jobType: values.jobType,
				niceToHaves: values.NiceTohaves,
				responsibility: values.responsibility,
				roles: values.title,
				salaryFrom: values.salaryFrom,
				salaryTo: values.salaryTo,
				whoYouAre: values.whoYouAre,
				benefits: values.benefits as Prisma.JsonArray,
				datePosted: moment().toDate(),
				companyId: session?.user.id,
				requiredSkills: values.requiredSkills,
			};

			await fetch("/api/job", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			await router.push("/dashboard/job-listing");
		} catch (error) {
			console.log(error);
		}
	};

	const getListFormsByState = () => {
		const state = form.getValues("state");

		let listOfForms: any;

		if (state === 1) {
			listOfForms = [
				"title",
				"category",
				"jobType",
				"salaryFrom",
				"salaryTo",
				"requiredSkills",
			];
		} else if (state === 2) {
			listOfForms = [
				"jobDescription",
				"NiceTohaves",
				"responsibility",
				"WhoYouAre",
			];
		}

		return listOfForms;
	};

	const nextStep = async () => {
		const listOfForms = getListFormsByState();

		const isValidate = await form.trigger(listOfForms);

		if (isValidate) {
			form.setValue("state", form.getValues("state")!! + 1);
			form.trigger(listOfForms);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<Stepper state={form.getValues("state")!!} />
				<StepFirst
					inputSkillRef={inputSkillRef}
					hideSkill={hideSkill}
					setHideSkill={updateHideSkill}
					skills={skills}
					setSkills={updateSkills}
					handleSaveSkill={handleSaveSkill}
					form={form}
				/>
				<StepSecond form={form} />
				<StepThree form={form} />
				<ButtonStep form={form} nextStep={nextStep} skills={skills} />
			</form>
		</Form>
	);
}
