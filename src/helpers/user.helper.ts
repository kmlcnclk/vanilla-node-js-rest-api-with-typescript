import { IncomingMessage } from "http";

class UserHelper {
  constructor() {}

  public async parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export default UserHelper;