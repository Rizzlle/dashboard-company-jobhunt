import useSWRImmutable from "swr/immutable";

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const useApi = (url: string) => {
	const { data, isLoading, error } = useSWRImmutable(url, fetcher);

	return {
		data,
		isLoading,
		isError: error,
	};
};

export default useApi;
