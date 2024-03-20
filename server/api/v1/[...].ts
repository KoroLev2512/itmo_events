import { proxyRequest } from "h3";
import { getServerSession, getToken } from "#auth";

export default defineEventHandler(async (event) => {
  await getServerSession(event);
  const token = await getToken({ event });

  const r = await proxyRequest(
    event,
    `${process.env.API_URL}/v${process.env.API_VERSION}` +
      event.path.replace("/api/v1/", "/"),
    token != null
      ? { headers: { Authorization: "Bearer " + token.access_token } }
      : {},
  );
  return r.data;
});
