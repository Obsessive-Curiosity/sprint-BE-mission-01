import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    author: {
      type: String,
      default: "익명",
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // 블로그 모델을 참조
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
