import { apiUrl } from "@/configs";
import axios from "axios";

const axiosCreate = axios.create({
  baseURL: apiUrl,
});

export * from "axios";
export { axiosCreate as axios };
