import { parseCategoriesJob } from "@/lib/utils";
import useApi from "./useApi";

export default function useJobCategories() {
	const { data, isError, isLoading } = useApi("/api/job/categories");

	return {
		data: isLoading ? [] : parseCategoriesJob(data),
		isLoading,
		isError,
	};
}
