import express from "express";
import blogRouter from "./Blog/controllers.js";
import commentRouter from "./Comment/controllers.js";
import replyRouter from "./Reply/controllers.js";

const router = express.Router();

router.use("/blog", blogRouter);
blogRouter.use("/:blogId/comment", commentRouter);
commentRouter.use("/:commentId/reply", replyRouter);

export default router;
