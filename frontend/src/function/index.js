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
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async ({ id, data }) => {
      const response = await axiosRequest("patch", `api/v1/voucher/update/${id}`, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["voucher"]);
      },
      onError: (error) => {
        console.error("Error updating voucher:", error);
      },
    }
  );

  return { mutationAsync };
};

const useUpdateExpenditure = () => {
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async ({ id, data }) => {
      const response = await axiosRequest("patch", `api/v1/expenditure/update/${id}`, data);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenditure"]);
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
    }
  );
  
  if (voucherError) {
    console.error("Error fetching voucher data:", voucherError);
    throw new Error("Couldn't fetch voucher data");
  }

  console.log("Fetched voucher data:", voucherData); // Log fetched voucher data


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
        `api/v1/expenditure/`
      ),
    {
      retry: 3,
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
        console.error("Error deleting expenditure:", error);
      },
    }
  );

  return { mutationAsync };
};    

export const FetchClassesAndSubclasses = () => {
  const fetchClassesAndSubclasses = async () => {
    try {
      const response = await fetch("/api/v1/classes-and-subclasses");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }
      console.log("Fetched data:", data); // Log fetched data
      return data;
    } catch (error) {
      console.error("Error fetching classes and subclasses:", error); // Log error
      throw error;
    }
  };

  return useQuery("classesAndSubclasses", fetchClassesAndSubclasses);
};




export {
  useMutationAsync,
  FetchVoucherData,
  useUpdateVoucher,
  useDeleteVoucher,
  useExpenditureMutationAsync,
  useUpdateExpenditure,
  FetchExpenditureData,
  useDeleteExpenditure
};
