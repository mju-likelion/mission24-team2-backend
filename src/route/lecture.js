import { Router, Request, Response } from "express";
import { body, param, query } from "express-validator";
import httpStatus, { NO_CONTENT } from "http-status";

import asyncWrapper from "../util/asyncWrapper";
import validation from "../middleware/validation";

import APIError from "../util/apiError";
import errors from "../util/errors";
import mongoose, { Mongoose, Types } from "mongoose";
import { verifyToken } from "../middleware/verifyToken";
import Lecture from "../models/lectures";
import Client from "../models/clients";
import Review from "../models/reviews";
const router = Router();

/**
 * 강좌 등록
 * @param {Request} req
 * @param {Response} res
 */
const registeLecture = async (req, res) => {
    const { category, trainerName, agency, courseName} = req.body;
  
    const lectures = new Lecture();
    lectures.category = category;
    lectures.trainerName = trainerName;
    lectures.agency = agency;
    lectures.courseName = courseName;
  
    await lectures.save();
  
    res.status(httpStatus.CREATED).json({
      id: lectures.id,
    });
  };

router.post(
    "/register",
  
    body("category").not().isEmpty(),
    body("trainerName").not().isEmpty(),
    body("agency").not().isEmpty(),
    body("courseName").not().isEmpty(),

    verifyToken,
    validation,
  
    asyncWrapper(registeLecture)
);


/**
 * 과목 별 강좌 필터링
 * @param {Request} req
 * @param {Response} res
 */
 const filterLecture = async (req, res) => {
    const { category } = req.query;
    
    const lectureList = await Lecture.find({ category: category });
    res.status(httpStatus.OK).json(lectureList);
};

router.get(
    "/filter",
    query("category").not().isEmpty(),
    validation,
    verifyToken,
    asyncWrapper(filterLecture)
);

/**
* 강사 이름으로 강좌 검색 
* @param {Request} req
* @param {Response} res
*/
const filterTrainer = async (req, res) => {
    const { name } = req.query;
    const lectureList = await Lecture.find({ trainerName: name });
    if(!lectureList) {
        throw new APIError(
            errors.TRAINER_NOT_EXISTS.statusCode,
            errors.TRAINER_NOT_EXISTS.errorCode,
            errors.TRAINER_NOT_EXISTS.errorMsg
        );
    }
    res.status(httpStatus.OK).json(lectureList);
}
router.get(
    "/find",
    query("name").not().isEmpty(),
    validation,
    verifyToken,
    asyncWrapper(filterTrainer)
);

//최근 수강평이 등록된 순서대로 강좌를 정렬하여 리턴.
const showreviews = async (req, res) => {
    const sortedReviews = await Review.find().sort({updatedAt:1});
    res.json(sortedReviews);
}
router.get("/",verifyToken,asyncWrapper(showreviews));
export default router;