import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface TeamCardProps {
	name: string;
	position: string;
	instagram: string;
	linkedin: string;
}

const TeamCard: FC<TeamCardProps> = ({
	instagram,
	linkedin,
	name,
	position,
}) => {
	return (
		<Card className="rounded-sm">
			<CardContent className="mx-auto text-center mt-6">
				<Image
					className="block mx-auto"
					src="/images/avatar.png"
					alt="/images/avatar.png"
					width={60}
					height={60}
				/>
				<div className="my-4">
					<div className="font-semibold text-sm text-[#25324B]">
						{name}
					</div>
					<div className="text-gray-500 text-xs">{position}</div>
				</div>
				<div className="inline-flex">
					<Link href={instagram} target="_blank">
						<Image
							className="block mx-auto"
							src="/images/ig.png"
							alt="/images/ig.png"
							width={24}
							height={24}
						/>
					</Link>
					<Link href={linkedin} target="_blank">
						<Image
							className="block mx-auto"
							src="/images/linkedin.png"
							alt="/images/linkedin.png"
							width={24}
							height={24}
						/>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default TeamCard;
