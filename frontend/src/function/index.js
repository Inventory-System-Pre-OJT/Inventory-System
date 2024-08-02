import { useQuery } from "react-query";
import { useQueryClient, useMutation } from "react-query";
import { axiosRequest } from "../service";

const useMutationAsync = (request, queryKeys = []) => {
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async (data) => {
      const response = await axiosRequest(request.method, request.url, data);
      return response;
    },
    {
      onSuccess: (data) => {
        if (request.method === "patch") {
          queryClient.setQueryData(queryKeys, data);
        } else {
          queryClient.invalidateQueries(queryKeys);
        }
      },
    }
  );

  return { mutationAsync };
};
const FetchVoucherData = () => {
  const {
    data: voucherData,
    isLoading: voucherLoading,
    isFetching: voucherFetching,
    error: voucherError,
    refetch: refetchVoucher,
  } = useQuery(
    ["voucher"],
    () =>
      axiosRequest(
        "get",
        `api/v1/voucher/get`
      ),
    {
      retry: 3,
      // staleTime ,
      // cacheTime ,
      // refetchOnWindowFocus
    }
  );
  if (voucherError) {
    throw new Error("Couldn't fetch voucher data");
  }

  return {
    voucherData,
    voucherFetching,
    voucherLoading,
    voucherError,
    refetchVoucher,
  };
};

// const useDeleteResource = (endpoint, options = {}) => {
// 	const queryClient = useQueryClient();
// 	const mutation = useMutation(
// 	  async (id) => {
// 		const response = await axiosRequest("delete", `${endpoint}/${id}`);
// 		return response.data;
// 	  },
// 	  {
// 		onSuccess: () => {
// 		  queryClient.invalidateQueries(options.queryKey || []);
// 		},
// 		...options.mutationOptions,
// 	  }
// 	);

// 	const deleteResource = async (id) => {
// 	  try {
// 		await toast.promise(mutation.mutateAsync(id), {
// 		  loading: options.loadingMessage || `${location.pathname.includes('pending') ? 'Cancelling...' : 'Deleting...'}`,
// 		  success: options.successMessage || `${location.pathname.includes('pending') ? 'Order Cancel' : 'Deleted'}`,
// 		  error: options.errorMessage || "Error when Deleting",
// 		});
// 	  } catch (error) {
// 		toast.error(error);
// 	  }
// 	};

// 	return { deleteResource };
//   };

// const findSelectedItemById = (dataArray, itemId) => {
// 	return dataArray?.find((item) => itemId === item._id);
//   };
export { useMutationAsync, FetchVoucherData };
