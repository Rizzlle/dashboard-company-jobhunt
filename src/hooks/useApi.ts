import useSWRImmutable from "swr/immutable";

const useApi = (url: string) => {
	const { data, isLoading, error } = useSWRImmutable(url);

	return {
		data,
		isLoading,
		isError: error,
	};
};

export default useApi;
