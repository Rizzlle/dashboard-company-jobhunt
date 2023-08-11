import { z } from "zod";

export const jobFormSchema = z.object({
	state: z.number(),
	title: z
		.string()
		.min(2, { message: "Job Title must be at least 2 characters" }),
	jobType: z.string({
		required_error: "You need to select a job type",
	}),
	salaryFrom: z.string({ required_error: "Salary From must be filled" }),
	salaryTo: z.string({ required_error: "Salary To must be filled" }),
	categoryId: z.string({ required_error: "You need to select a category" }),
	requiredSkills: z
		.string()
		.array()
		.nonempty({ message: "Required skill must be at least 1 skill" }),
	jobDescription: z
		.string({ required_error: "Content must be filled" })
		.min(10, { message: "Content must be at least 10 characters" }),
	responsibility: z
		.string({ required_error: "Content must be filled" })
		.min(10, { message: "Content must be at least 10 characters" }),
	whoYouAre: z
		.string({ required_error: "Content must be filled" })
		.min(10, { message: "Content be at least 10 characters" }),
	NiceTohaves: z
		.string({ required_error: "Content must be filled" })
		.min(10, { message: "Content must be at least 10 characters" }),
	benefits: z
		.object({
			benefit: z.string(),
			description: z.string(),
		})
		.array()
		.nonempty({ message: "Benefits must be at least 1 benefit" }),
});

export const signInSchema = z.object({
	email: z.string().email({ message: "Email not valid" }),
	password: z.string().min(5, { message: "Password should not be empty" }),
});

export const signUpSchema = z.object({
	email: z.string().email({ message: "Email not valid" }),
	password: z.string().min(1, { message: "Password should not be empty" }),
	name: z.string().min(1, { message: "Name should not empty" }),
});

export const overviewSchema = z.object({
	image: z.any(),
	name: z.string().min(1, { message: "Company name is required" }),
	website: z.string().min(1, { message: "Company website is required" }),
	location: z.string().min(1, { message: "Please select location" }),
	employee: z.string().min(1, { message: "Employee is required" }),
	industry: z.string().min(1, { message: "Industry is required" }),
	dateFounded: z.date({ required_error: "Date founded is required" }),
	techStack: z
		.string()
		.array()
		.nonempty({ message: "Tech stack is required" }),
	description: z.string().min(1, { message: "Description is required" }),
});

export const socialMediaSchema = z.object({
	instagram: z.string(),
	twitter: z.string(),
	facebook: z.string(),
	linkedin: z.string(),
	youtube: z.string(),
});

export const teamCompanySchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	position: z.string().min(1, { message: "Position is required" }),
	instagram: z.string().min(1, { message: "Instagram is required" }),
	linkedin: z.string().min(1, { message: "LinkedIn is required" }),
});
