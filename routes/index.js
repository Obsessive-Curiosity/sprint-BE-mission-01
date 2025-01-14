import express from "express";
import blogRouter from "./Blog/controllers.js";
import commentRouter from "./Comment/controllers.js";
import replyRouter from "./Reply/controllers.js";

const router = express.Router();

router.use("/blog", blogRouter);
router.use("/blog/:blogId/comment", commentRouter);
router.use("/blog/:blogId/comment/:commentId/reply", replyRouter);

export default router;
