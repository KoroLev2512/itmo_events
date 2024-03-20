import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();

  const events = await $fetch<{
    error_code: number;
    error_message: string | null;
    result: [{ id: number }];
  }>("/events", { baseURL: config.public.baseURL });

  return events.result.map((value) => {
    return asSitemapUrl(`/events/${value.id}`);
  });
});
