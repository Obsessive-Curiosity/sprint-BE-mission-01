import Blog from "../../models/Blog.js";

const getBlogList = async (req, res) => {
  try {
    const blogList = await Blog.find({});

    if (!blogList) {
      res.status(404).send("블로그 리스트가 존재하지 않습니다.");
    }

    res.status(200).send(blogList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("블로그의 id가 존재하지 않습니다.");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("해당 블로그가 존재하지 않습니다.");
    }

    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = await Blog.create({
      title,
      content,
      author,
    });

    if (!newBlog) {
      return res.status(404).send("블로그 생성에 실패했습니다.");
    }

    res.status(201).send(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).send("수정할 블로그의 id가 존재하지 않습니다.");
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "수정할 블로그가 존재하지 않습니다." });
    }

    Object.keys(req.body).forEach((key) => {
      blog[key] = req.body[key];
    });
    await blog.save();

    res.status(203).send(blog);
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("삭제할 블로그의 id가 존재하지 않습니다.");
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).send("삭제할 블로그가 존재하지 않습니다.");
    }

    res.status(204).send(deletedBlog);
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "서버가 문제네" });
  }
};

const service = {
  getBlogList,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default service;
