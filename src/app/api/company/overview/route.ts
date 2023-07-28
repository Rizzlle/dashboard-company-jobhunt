import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

const CORS_SETTINGS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
	const data = await request.json();

	const profile = await prisma.companyoverview.findFirst({
		where: {
			companyId: data.companyId,
		},
	});

	const result = await prisma.companyoverview.upsert({
		where: {
			companyId: data.companyId,
			id: profile?.id || "",
		},
		update: data,
		create: data,
	});

	return NextResponse.json(result);
}
