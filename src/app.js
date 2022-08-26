import express from "express";
import cors from "cors";
import { restart } from "nodemon";

const app = express();
const PORT = 3000;
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`);
  });

app.get('/', (req,res) => {
    res.send("수고했어 오늘도");
})
  
export default app;