import { getToken } from "#auth";
export default eventHandler(async (event) => await getToken({ event }));
