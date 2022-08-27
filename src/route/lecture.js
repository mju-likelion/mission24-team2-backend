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
    const { category } = req.params;
    
    const lectureList = await Lecture.find({ category: category });
    res.status(httpStatus.OK).json(lectureList);
};

router.get(
    "/filter/:category",
    param("category").not().isEmpty(),
    validation,
    verifyToken,
    asyncWrapper(filterLecture)
);

//강사 이름으로 강좌 검색하기

export default router;