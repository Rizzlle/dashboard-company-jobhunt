import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { categoryJobTypes, optionsTypes } from "@/constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 8);

	return hashedPassword;
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	const isMatch = await bcrypt.compare(password, hashedPassword);

	return isMatch;
};

export const parseCategoriesJob = (categories: categoryJobTypes[]) => {
	return categories.map((option: categoryJobTypes, i: number) => {
		return {
			label: option.name,
			value: option.id,
		};
	});
};
