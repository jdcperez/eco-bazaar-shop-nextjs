export type fetchDataProps = {
  endpoint: string,
  cache?: RequestCache,
  headers?: HeadersInit,
  mode?: "cors" | "no-cors",
  params: any,
  responseType?: "json" | "blob",
  method?: "POST" | "GET" | "PATCH" | "DELETE"
};