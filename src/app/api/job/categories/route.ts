import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

const CORS_SETTINGS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
	const result = await prisma.categoryJob.findMany();

	return NextResponse.json(result);
}
