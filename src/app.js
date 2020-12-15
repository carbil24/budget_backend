import express from "express";
import morgan from "morgan";
import cors from "cors";
import pkg from "../package.json";
import { createRules } from "./libs/initialSetup";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import groupRoutes from "./routes/group.routes";
import memberRoutes from "./routes/member.routes";

const app = express();
createRules();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/members", memberRoutes);

export default app;
