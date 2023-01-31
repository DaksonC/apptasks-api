import express from "express";
import routes from "./routes";
import cors from "cors";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes)

  return app.listen(process.env.PORT, () => {
    console.log("📡 Server is running! 📡");
  });

});