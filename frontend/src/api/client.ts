import { Configuration, DefaultApi } from "../oapi";

export const config = new Configuration({
  basePath: "http://localhost:8080",
});

export const apiClient = new DefaultApi(config);
