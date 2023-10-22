import express, { NextFunction, Request, Response } from "express";
import { getCalendarEvents } from "./getCalendarEvents.js";
import { getUserInfo } from "./getUserInfo.js";
import { getUsers } from "./getUsers.js";

export const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = new URLSearchParams(req.query as Record<string, string>);
    const clientAccessToken = query.get("access_token");
    if (!clientAccessToken) {
      res.status(400).json({
        error: "required",
        message: "Required parameter is missing",
      });
      return;
    }
    await getUserInfo(clientAccessToken);
    next();
  } catch (error) {
    res.send(401);
  }
});

app.use("/events", async (req: Request, res: Response) => {
  try {
    const query = new URLSearchParams(req.query as Record<string, string>);
    const events = await getCalendarEvents(query);
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.use("/users", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});
