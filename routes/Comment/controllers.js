import express from "express";
import service from "./service.js";

const router = express.Router({ mergeParams: true });

router.get("/", service.getCommentList); // 댓글 목록 조회
router.get("/:id", service.getComment); // 특정 댓글 조회
router.post("/", service.createComment); // 댓글 생성
router.patch("/:id", service.updateComment); // 댓글 수정
router.delete("/:id", service.deleteComment); // 댓글 삭제

export default router;
