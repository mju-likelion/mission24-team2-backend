import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://mju:mju0987@cluster0.xwm1ep0.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(cors());
app.use(express.json());

dotenv.config();

//로그인 회원가입 기능
import client from "./route/client"; 
app.use("/client", client);

import lecture from "./route/lecture";
app.use("/lecture", lecture);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});
  
app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`);
});  
export default app;