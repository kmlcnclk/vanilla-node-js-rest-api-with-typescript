import { IncomingMessage, ServerResponse } from "http";
import UserRouter from "./user.router";
import Response from "../utils/response";

class MainRouter {
  private userRoute: UserRouter;

  constructor() {
    this.userRoute = new UserRouter();
  }

  public handleRequests(req: IncomingMessage, res: ServerResponse) {
    const url = req.url || "";

    if (url.startsWith("/users")) {
      this.userRoute.routes(req, res);
    } else {
      Response.send(res, {
        status: 404,
        data: { message: "Route not found" },
      });
    }
  }
}

export default MainRouter;
