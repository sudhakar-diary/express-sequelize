import AppDatabase from "@database/app.database";

import { httpTerminator, server } from "./index";

class AppTerminator {
  public async handleExit(code: number): Promise<void> {
    try {
      console.log(`Attempting a graceful shutdown with code ${code}`);
      if (server.listening) {
        new AppDatabase().closeDB();
        console.log("Terminating HTTP connections");
        await httpTerminator.terminate();
      }

      console.log(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      console.log("Error shutting down gracefully");
      console.log(error);
      console.log(`Forcing exit with code ${code}`);
      process.exit(code);
    }
  }
}

export default AppTerminator;
