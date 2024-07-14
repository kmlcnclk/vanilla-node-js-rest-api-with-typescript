import { IncomingMessage, ServerResponse } from "http";
import http from "http";
import MainRoute from "./routes";
import Response from "./utils/response";
import LoggerMiddleware from "./middlewares/logger.middleware";

const PORT = process.env.PORT || 3000;
const mainRoute = new MainRoute();

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || "";
    const method = req.method || "";

    if (url && method) {
      mainRoute.handleRequests(req, res);
    } else {
      Response.send(res, {
        status: 404,
        data: { message: "Route not found" },
      });
    }
  }
);

server.on("request", LoggerMiddleware.info);

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
