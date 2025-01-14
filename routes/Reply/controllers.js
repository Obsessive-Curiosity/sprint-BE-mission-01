import express from "express";
import service from "./service.js";

const router = express.Router({ mergeParams: true });

router.get("/", service.getReplyList); // 대댓글 목록 조회
router.get("/:id", service.getReply); // 대특정 댓글 조회
router.post("/", service.createReply); // 대댓글 생성
router.patch("/:id", service.updateReply); // 대댓글 수정
router.delete("/:id", service.deleteReply); // 대댓글 삭제

export default router;
