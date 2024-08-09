import { axiosRequest } from "@/service";
import { useQuery } from "react-query";
const FetchStockData = () => {
    const {
        data: stockData,
        isLoading: stockLoading,
        isFetching: stockFetching,
        error: stockError,
        refetch: refetchStock,
    } = useQuery(
        ["announcements"],
        () =>
            axiosRequest(
                'get','/api/v1/stock/getStock'
            ),
        {
            retry: 3,
            // staleTime ,
            // cacheTime ,
            // refetchOnWindowFocus
        }
    );
    // if (voucherError) {
    //   throw new Error("Couldn't fetch voucher data");
    // }

    return {
        stockData,
        stockFetching,
        stockLoading,
        stockError,
        refetchStock,
    };
};

export { FetchStockData}