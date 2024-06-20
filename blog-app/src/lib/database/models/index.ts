import {  Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  title: String,
  description: String,
})

const Blog = models.blog_posts || model('blog_posts', BlogSchema)

export default Blog;


const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
})

const User = models.user || model('user', UserSchema)

export { 
  User
}