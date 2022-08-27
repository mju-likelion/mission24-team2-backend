//강좌 정보 스키마

import mongoose from "mongoose";
//카테고리, 강사 이름, 소속사, 강좌 이름, 참여수, 별점 합, 별점 평균
const lectureSchema = new mongoose.Schema(
  {
    //과목
    category: {
      type: String,
      trim: true,
      required: true,
    },

    //강사이름
    trainerName: {
      type: String,
      trim: true,
      required: true,
    },

    //소속사
    agency: {
      type: String,
      trim: true,
      required: true,
    },

    //강좌이름
    courseName: {
      type: String,
      trim: true,
      required: true,
    },
    
    //참여수
    participateCount: {
        type: Number,
        default: 0,
    },

    //별점 합
    starredSum: {
        type: Number,
        default: 0,
    },

    //별점 평균
    starredAverage: {
        type: Number,
        default: 0,
    }
  }
);

const LectureSchema = mongoose.model("lectures", lectureSchema); //모델 이름이 Clients임을 선언함
export default LectureSchema;
