import { IncomingMessage, ServerResponse } from "http";
import UserService from "../services/user.service";
import Response from "../utils/response";
import UserDto from "../dto/user.dto";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  public async getUsers(req: IncomingMessage, res: ServerResponse) {
    const users = await this.userService.getUsers();
    return Response.send(res, { status: 200, data: users });
  }

  public async getUserById(
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ) {
    const { status, data } = await this.userService.getUserById(id);

    return Response.send(res, { status, data });
  }

  public async createUser(
    req: IncomingMessage,
    res: ServerResponse,
    userDto: UserDto
  ) {
    const newUser = this.userService.createUser(userDto);

    return Response.send(res, { status: 201, data: newUser });
  }
}

export default UserController;
