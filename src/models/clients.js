//고객 정보 스키마

import mongoose from "mongoose";
//이메일, 비밀번호, 엑세스 토큰, 이름, 생년월일
const clientSchema = new mongoose.Schema(
  {
    // 이메일
    email: {
      type: String,
      trim: true,
      required: true,
    },

    // 비밀번호
    password: {
      type: String,
      trim: true,
      required: true,
    },

    // 닉네임
    nickname: {
      type: String,
      trim: true,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("clients", clientSchema); //모델 이름이 Clients임을 선언함
export default Client;
