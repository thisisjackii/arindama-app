import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  const message = `Server is running at http://localhost:${port}`;
  const messageLength = message.length;
  const boxWidth = messageLength + 6;
  const horizontalLine = chalk.yellow("=".repeat(boxWidth));
  const emptyLine = chalk.yellow("||") + " ".repeat(boxWidth - 4) + chalk.yellow("||");
  const messageLine = chalk.yellow("||") + " " + chalk.blue(message) + " " + chalk.yellow("||");

  console.log(horizontalLine);
  console.log(emptyLine);
  console.log(messageLine);
  console.log(emptyLine);
  console.log(horizontalLine);
});

export default app;
