import { IncomingMessage, ServerResponse } from "http";
import UserController from "../controller/user.controller";
import UserMiddleware from "../middlewares/user.middleware";
import Response from "../utils/response";

class UserRouter {
  private userMiddleware: UserMiddleware;
  private userController: UserController;

  constructor() {
    this.userMiddleware = new UserMiddleware();
    this.userController = new UserController();
  }

  public routes(req: IncomingMessage, res: ServerResponse) {
    const url = req.url || "";
    const method = req.method || "";

    if (url === "/users" && method === "GET") {
      this.userController.getUsers(req, res);
    } else if (url.match(/^\/users\/\d+$/) && method === "GET") {
      const id = parseInt(url.split("/")[2]);
      this.userController.getUserById(req, res, id);
    } else if (url === "/users" && method === "POST") {
      this.userMiddleware.validateUserData(
        req,
        res,
        this.userController.createUser
      );
    } else {
      Response.send(res, {
        status: 404,
        data: { message: "Route not found" },
      });
    }
  }
}

export default UserRouter;
