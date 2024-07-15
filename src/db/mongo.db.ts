import mongoose, { ConnectOptions } from "mongoose";

class MongoDB {
  private uri: string;
  private connectionOptions: ConnectOptions;

  constructor(uri: string, connectionOptions: ConnectOptions = {}) {
    this.uri = uri;
    this.connectionOptions = connectionOptions;
  }

  async connect(): Promise<void> {
    try {
      if (!mongoose.connection || mongoose.connection.readyState === 0) {
        await mongoose.default?.connect(this.uri, {
          ...this.connectionOptions,
        });

        console.log("MongoDB Connection Successful");
      }
    } catch (error) {
      console.error(`MongoDB Connection Error: ${error}`);
    }
  }

  async close(): Promise<void> {
    try {
      if (mongoose.connection.readyState) {
        await mongoose.connection.close();

        console.log("MongoDB Connection Closed");
      }
    } catch (error) {
      console.error(`MongoDB Connection Connection Shutdown Error: ${error}`);
    }
  }
}

export default MongoDB;
