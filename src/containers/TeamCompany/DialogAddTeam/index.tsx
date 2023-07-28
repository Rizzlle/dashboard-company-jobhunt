import FieldDescription from "@/components/form/PostJobForm/FieldDescription";
import FieldWrapper from "@/components/form/PostJobForm/FieldItem";
import TeamCompanyForm from "@/components/form/TeamCompanyForm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React, { FC } from "react";

interface DialogAddTeamProps {}

const DialogAddTeam: FC<DialogAddTeamProps> = ({}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-bluePrimary">
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
					Add Members
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[420px]">
				<DialogHeader>
					<DialogTitle>Add New Team</DialogTitle>
					<DialogDescription>
						Fill the field to add new team
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<TeamCompanyForm />
			</DialogContent>
		</Dialog>
	);
};

export default DialogAddTeam;
