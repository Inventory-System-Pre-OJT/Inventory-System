import { useQuery } from "react-query";
import { useQueryClient, useMutation } from "react-query";
import { axiosRequest } from "../service";
import { useState, useEffect } from "react";


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



export const useFetchOptions = (selectedClassExp) => {
  const [classExpOptions, setClassExpOptions] = useState([]);
  const [subclassOptions, setSubclassOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch classExp options
  useEffect(() => {
    const fetchClassExpOptions = async () => {
      setIsLoading(true);
      console.log("Starting fetch for classExp options...");
      try {
        const response = await axiosRequest("get", "/api/v1/expenditure/class");
        console.log("Fetched classExp options:", response.data);
        setClassExpOptions(response.data);
      } catch (err) {
        console.error("Error fetching classExp options:", err);
        setError(err);
      } finally {
        setIsLoading(false);
        console.log("Finished fetch for classExp options.");
      }
    };

    fetchClassExpOptions();
  }, []);

  // Fetch subclass options based on selected classExp
  useEffect(() => {
    const fetchSubclassOptions = async () => {
      if (selectedClassExp) {
        setIsLoading(true);
        console.log("Fetching subclasses for selected classExp:", selectedClassExp);
        try {
          const response = await axiosRequest("get", `/api/v1/expenditure/subclasses/${selectedClassExp}`);
          console.log("Fetched subclass options:", response.data);
          setSubclassOptions(response.data);
        } catch (err) {
          console.error("Error fetching subclasses:", err);
          setError(err);
        } finally {
          setIsLoading(false);
          console.log("Finished fetch for subclasses.");
        }
      } else {
        console.log("No classExp selected. Clearing subclass options.");
        setSubclassOptions([]);
      }
    };

    fetchSubclassOptions();
  }, [selectedClassExp]);

  return { classExpOptions, subclassOptions, isLoading, error };
};
export { useMutationAsync, FetchVoucherData , useUpdateVoucher, useDeleteVoucher, useExpenditureMutationAsync,useUpdateExpenditure, FetchExpenditureData, useDeleteExpenditure};
