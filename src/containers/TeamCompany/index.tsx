"use client";

import FieldDescription from "@/components/form/PostJobForm/FieldDescription";
import FieldWrapper from "@/components/form/PostJobForm/FieldItem";
import { FC } from "react";
import DialogAddTeam from "./DialogAddTeam";
import TeamCard from "./TeamCard";

interface teamProps {
	name: string;
	position: string;
	instagram: string;
	linkedin: string;
}

interface TeamCompanyProps {
	data: teamProps[];
}

const TeamCompany: FC<TeamCompanyProps> = ({ data }) => {
	return (
		<div>
			<FieldWrapper>
				<FieldDescription
					title="Basic Information"
					subtitle="Add team members of your <br /> company"
				/>
				<div className="w-[65%]">
					<div className="flex flex-row justify-between items-center">
						<div className="text-lg font-semibold">
							{data.length} Members
						</div>
						<DialogAddTeam />
					</div>
					<div className="grid grid-cols-3 gap-5 mt-6">
						{data.map((item: any, i: number) => (
							<TeamCard
								instagram={item.instagram}
								linkedin={item.linkedin}
								name={item.name}
								position={item.position}
								key={i}
							/>
						))}
					</div>
				</div>
			</FieldWrapper>
		</div>
	);
};

export default TeamCompany;
