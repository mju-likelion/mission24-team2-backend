//강좌 정보 스키마

import mongoose from "mongoose";
//카테고리, 강사 이름, 소속사, 강좌 이름, 참여수, 별점 합, 별점 평균
const reviewSchema = new mongoose.Schema(
  {
    //강좌아이디
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    //제목
    subject: {
      type: String,
      required: true,
    },

    //작성자
    author: {
      type: String,
      required: true,
    },

    //평점
    stared: {
      type: Number,
      required: true,
    },
    
    //내용
    content: {
        type: String,
        required: true,
    }
  }
);

const Review = mongoose.model("reviews", reviewSchema); //모델 이름이 Clients임을 선언함
export default Review;
