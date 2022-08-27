import { Router, Request, Response } from "express";
import { body, param, query } from "express-validator";
import httpStatus, { NO_CONTENT } from "http-status";
import crypto from "crypto";

import asyncWrapper from "../util/asyncWrapper";
import validation from "../middleware/validation";

import Client from "../models/clients";
import Lecture from "../models/lectures";

import APIError from "../util/apiError";
import errors from "../util/errors";
import mongoose, { Mongoose, Types } from "mongoose";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken";
import Review from "../models/reviews";

const router = Router();

//수강 강좌 지정하기
/**
 * 플랫폼 필터링 기능
 * @param {Request} req
 * @param {Response} res
 */
// const filterAgency = async (req, res) => {
//     const { agency } = req.query;
//     const filteredList = await Lecture.find({ agency: agency });
    
//     res.status(httpStatus.OK).json(filteredList);
// }
// router.get(
//     "/filteragency",
//     query("agency").not().isEmpty(),
//     validation,
//     verifyToken,
//     asyncWrapper(filterAgency)
// );


//수강평 등록

const createReview = async (req, res) => {
    const { lectureId, subject, stared, content } = req.body;
    const author = res.locals.client.nickname;
    
    const lectureInfo = await Lecture.findById(lectureId);
    if(!lectureInfo) {
        throw new APIError(
            errors.LECTURE_NOT_EXISTS.statusCode,
            errors.LECTURE_NOT_EXISTS.errorCode,
            errors.LECTURE_NOT_EXISTS.errorMsg
        );
    }
    const reviews = new Review();
    reviews.lectureId = lectureId;
    reviews.author = author;
    reviews.subject = subject;
    reviews.stared = stared;
    reviews.content = content;
  
    await reviews.save();

    res.status(httpStatus.CREATED).json({
        id: reviews.id,
    });
}
router.post(
    "/create",
    body("lectureId").not().isEmpty(),
    body("subject").not().isEmpty(),
    body("stared").not().isEmpty(),
    body("content").not().isEmpty(),
    validation,
    verifyToken,
    asyncWrapper(createReview)
);
//수강평 좋아요 누르기
//수강평 다음 버튼 누르기
//수강평 이전 버튼 누르기

export default router;