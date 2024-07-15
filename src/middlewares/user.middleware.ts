import { IncomingMessage, ServerResponse } from "http";
import UserHelper from "../helpers/user.helper";
import Response from "../utils/response";
import UserDto from "../dto/user.dto";

class UserMiddleware {
  private userHelper: UserHelper;

  constructor() {
    this.userHelper = new UserHelper();

    this.validateUserData = this.validateUserData.bind(this);
  }

  public async validateUserData(
    req: IncomingMessage,
    res: ServerResponse,
    next: Function
  ) {
    const userDto: UserDto = await this.userHelper.parseBody(req);

    if (!userDto.name || !userDto.email || !userDto.password) {
      return Response.send(res, {
        status: 400,
        data: { message: "Missing required fields" },
      });
    } else {
      return next(req, res, userDto);
    }
  }
}

export default UserMiddleware;
