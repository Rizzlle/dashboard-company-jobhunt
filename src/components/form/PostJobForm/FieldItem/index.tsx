import React, { ReactNode } from "react";

export default function FieldWrapper({ children }: { children: ReactNode }) {
	return <div className="flex flex-row items-start">{children}</div>;
}
