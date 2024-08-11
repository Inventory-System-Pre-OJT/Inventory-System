import { useQuery } from "react-query";
import { axiosRequest } from "../service";

// Fetch classes from the API
const fetchClasses = async () => {
  const response = await axiosRequest("get", "/api/v1/expenditure/");
  return response.data; // Ensure to return data directly
};

export const useFetchClasses = () => {
  return useQuery("classes", fetchClasses);
};

// Fetch subclasses by classExp
const fetchSubclassesByClassExp = async (classExp) => {
  const response = await axiosRequest("get", `/api/v1/expenditure/class/${classExp}`);
  return response.data; // Ensure to return data directly
};

export const useFetchSubclasses = (classExp) => {
  return useQuery(["subclasses", classExp], () => fetchSubclassesByClassExp(classExp), {
    enabled: !!classExp, // Fetch subclasses only if classExp is not empty
  });
};
