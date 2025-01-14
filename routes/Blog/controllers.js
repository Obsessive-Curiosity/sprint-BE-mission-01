import express from "express";
import service from "./service.js";

const router = express.Router();

router.get("/", service.getBlogList);
router.get("/:id", service.getBlog);
router.post("/", service.createBlog);
router.patch("/:id", service.updateBlog);
router.delete("/:id", service.deleteBlog);

export default router;
