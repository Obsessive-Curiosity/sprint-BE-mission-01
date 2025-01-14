import Reply from "../../models/Reply.js";

const getReplyList = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }

    const replyList = await Reply.find({
      comment_id: commentId,
    });
    if (!replyList) {
      return res.status(404).send("대댓글이 존재하지 않습니다.");
    }

    res.status(200).send(replyList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const getReply = async (req, res) => {
  try {
    const { commentId, id } = req.params;
    if (!commentId) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("대댓글의 id가 존재하지 않습니다.");
    }

    const reply = await Reply.findOne({
      comment_id: commentId,
      _id: id,
    });
    if (!reply) {
      return res.status(404).send("대댓글이 존재하지 않습니다.");
    }

    res.status(200).send(reply);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const createReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, author } = req.body;

    if (!commentId) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }

    const newReply = await Reply.create({
      content,
      author,
      comment_id: commentId,
    });

    if (!newReply) {
      return res.status(404).send("대댓글 생성에 실패했습니다.");
    }

    res.status(201).send(newReply);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const updateReply = async (req, res) => {
  try {
    const { commentId, id } = req.params;
    if (!commentId) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("수정할 대댓글의 id가 존재하지 않습니다.");
    }

    const reply = await Reply.findOne({
      comment_id: commentId,
      _id: id,
    });
    if (!reply) {
      return res
        .status(404)
        .send({ message: "수정할 대댓글이 존재하지 않습니다." });
    }

    // 동적 필드 업데이트
    Object.keys(req.body).forEach((key) => {
      reply[key] = req.body[key];
    });
    const updatedReply = await reply.save();

    res.status(203).send(updatedReply);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { commentId, id } = req.params;
    if (!commentId) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("삭제할 대댓글의 id가 존재하지 않습니다.");
    }

    const deletedReply = await Reply.findOneAndDelete({
      comment_id: commentId,
      _id: id,
    });

    if (!deletedReply) {
      return res.status(404).send("삭제할 대댓글이 존재하지 않습니다.");
    }

    res.status(204).send(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const service = {
  getReplyList,
  getReply,
  createReply,
  updateReply,
  deleteReply,
};

export default service;
