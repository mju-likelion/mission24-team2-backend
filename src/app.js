import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server open at ${PORT}`);
  });

app.get('/', (req,res) => {
    res.send("안녕");
})
  
export default app;