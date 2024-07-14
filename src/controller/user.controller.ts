import { IncomingMessage, ServerResponse } from "http";

class UserController {
  public getUsers(req: IncomingMessage, res: ServerResponse) {}

  public getUserById(req: IncomingMessage, res: ServerResponse, id: number) {}

  public createUser(req: IncomingMessage, res: ServerResponse) {}
}

export default UserController;
