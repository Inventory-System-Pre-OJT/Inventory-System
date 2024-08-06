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

const useExpenditureMutationAsync = (request, queryKeys = []) => {
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

const useUpdateVoucher = () => {
  const queryClient = useQueryClient(); // Ensure this is correctly defined

  const mutationAsync = useMutation(
    async ({ id, data }) => {
      const response = await axiosRequest("patch", `api/v1/voucher/update/${id}`, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["voucher"]); // This should work if queryClient is defined
      },
      onError: (error) => {
        console.error("Error updating voucher:", error);
      },
    }
  );

  return { mutationAsync };
};

const useUpdateExpenditure = () => {
  const queryClient = useQueryClient(); // Ensure this is correctly defined

  const mutationAsync = useMutation(
    async ({ id, data }) => {
      const response = await axiosRequest("patch", `api/v1/expenditure/update/${id}`, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenditure"]); // This should work if queryClient is defined
      },
      onError: (error) => {
        console.error("Error updating expenditure:", error);
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

const FetchExpenditureData = () => {
  const {
    data: expenditureData,
    isLoading: expenditureLoading,
    isFetching: expenditureFetching,
    error: expenditureError,
    refetch: refetchExpenditure,
  } = useQuery(
    ["expenditure"],
    () =>
      axiosRequest(
        "get",
        `api/v1/expenditure/get`
      ),
    {
      retry: 3,
      // staleTime ,
      // cacheTime ,
      // refetchOnWindowFocus
    }
  );
  if (expenditureError) {
    throw new Error("Couldn't fetch expenditure data");
  }

  return {
    expenditureData,
    expenditureFetching,
    expenditureLoading,
    expenditureError,
    refetchExpenditure,
  };
};


const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async (id) => {
      const response = await axiosRequest("delete", `api/v1/voucher/delete/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["voucher"]);
      },
      onError: (error) => {
        console.error("Error deleting voucher:", error);
      },
    }
  );

  return { mutationAsync };
};

const useDeleteExpenditure = () => {
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async (id) => {
      const response = await axiosRequest("delete", `api/v1/expenditure/delete/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenditure"]);
      },
      onError: (error) => {
        console.error("Error deleting voucher:", error);
      },
    }
  );

  return { mutationAsync };
};


// const useDeleteResource = (endpoint, options = {}) => {
// 	const queryClient = useQueryClient();
// 	const mutation = useMutation(
// 	  async (id) => {
// 		const response = await axiosRequest("delete", `api/v1/voucher/delete/${id}`);
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
export { useMutationAsync, FetchVoucherData , useUpdateVoucher, useDeleteVoucher, useExpenditureMutationAsync,useUpdateExpenditure, FetchExpenditureData, useDeleteExpenditure};
