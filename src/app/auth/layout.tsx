"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<>
			<div className="md:hidden">
				<Image
					src="/images/bg-auth.png"
					alt="/images/bg-auth.png"
					width={1280}
					height={843}
				/>
			</div>
			<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				{pathname === "/auth/new-company" ? (
					<Link
						href="/auth/signin"
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"absolute right-4 top-4 md:right-8 md:top-8"
						)}
					>
						Sign In
					</Link>
				) : (
					<Link
						href="/auth/new-company"
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"absolute right-4 top-4 md:right-8 md:top-8"
						)}
					>
						Register
					</Link>
				)}
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						Job Hunt Dashboard
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours
								of work and helped me deliver stunning designs
								to my clients faster than ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
