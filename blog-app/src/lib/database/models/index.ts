import {  Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  title: String,
  description: String,
})

const Blog = model('blog_post', BlogSchema)

export default Blog;