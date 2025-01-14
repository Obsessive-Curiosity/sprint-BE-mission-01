import Comment from "../../models/Comment.js";

const getCommentList = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }

    const commentList = await Comment.find({
      blog_id: blogId,
    });
    if (!commentList) {
      return res.status(404).send("댓글이 존재하지 않습니다.");
    }

    res.status(200).send(commentList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const getComment = async (req, res) => {
  try {
    const { blogId, id } = req.params;
    if (!blogId) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("댓글의 id가 존재하지 않습니다.");
    }

    const comment = await Comment.findOne({
      blog_id: blogId,
      _id: id,
    });
    if (!comment) {
      return res.status(404).send("댓글이 존재하지 않습니다.");
    }

    res.status(200).send(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, author } = req.body;

    if (!blogId) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }

    const newComment = await Comment.create({
      content,
      author,
      blog_id: blogId,
    });

    if (!newComment) {
      return res.status(404).send("댓글 생성에 실패했습니다.");
    }

    res.status(201).send(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { blogId, id } = req.params;
    if (!blogId) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("수정할 댓글의 id가 존재하지 않습니다.");
    }

    const comment = await Comment.findOne({
      blog_id: blogId,
      _id: id,
    });
    if (!comment) {
      return res
        .status(404)
        .send({ message: "수정할 댓글이 존재하지 않습니다." });
    }

    Object.keys(req.body).forEach((key) => {
      comment[key] = req.body[key];
    });
    const updatedComment = await comment.save();

    res.status(203).send(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { blogId, id } = req.params;
    if (!blogId) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }
    if (!id) {
      return res.status(404).send("삭제할 댓글의 id가 존재하지 않습니다.");
    }

    const deletedComment = await Comment.findOneAndDelete({
      blog_id: blogId,
      _id: id,
    });

    if (!deleteComment) {
      return res.status(404).send("삭제할 댓글이 존재하지 않습니다.");
    }

    res.status(204).send(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const service = {
  getCommentList,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

export default service;
