import { IncomingMessage, ServerResponse } from "http";
import UserHelper from "../helpers/user.helper";
import Response from "../utils/response";

class UserMiddleware {
  private userHelper: UserHelper;

  constructor() {
    this.userHelper = new UserHelper();
  }

  public async validateUserData(
    req: IncomingMessage,
    res: ServerResponse,
    next: Function
  ) {
    const { name, email, password } = await this.userHelper.parseBody(req);

    if (!name || !email || !password) {
      Response.send(res, {
        status: 400,
        data: { message: "Missing required fields" },
      });
    } else {
      next(req, res);
    }
  }
}

export default UserMiddleware;
