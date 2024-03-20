export const useApiFetch = <T>(
  request: string,
  opts?: Record<string, unknown>,
) => {
  const config = useRuntimeConfig();
  return useFetch<{
    error_code: number;
    error_message: string | null;
    result: T;
  }>(request, {
    baseURL: config.public.siteUrl + "/api/v1" /* config.public.baseURL */,
    ...opts,
  });
};
