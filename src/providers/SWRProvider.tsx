import React, { FC } from "react";

import { SWRConfig } from "swr";

import { fetcher } from "@/axios";

interface SWRProviderProps {
	children: React.ReactNode;
}

const SWRProvider: FC<SWRProviderProps> = ({ children }) => {
	return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default SWRProvider;
