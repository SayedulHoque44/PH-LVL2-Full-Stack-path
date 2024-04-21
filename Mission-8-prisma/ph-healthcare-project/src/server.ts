import { Server } from "http";
import app from "./app";

const port = 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("App is listening on port:", port);
  });

  // ------------------ To stop preventing server crash --------------
  const ExitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("server close");
      });
    }
    process.exit(1); // to exit from this process
  };

  //  if there is error which not handled by tryCatch or synchronously happaning then handle it by uncaughtException to off the server
  process.on("uncaughtException", (error) => {
    console.log(error);
    ExitHandler();
  });

  // if there is an error which happended in tryCatch but tryCatch not able to hanlde it if this error occure then using unhandledRejection we can close the server
  process.on("unhandledRejection", (error) => {
    console.log(error);
    ExitHandler();
  });
}
main();
