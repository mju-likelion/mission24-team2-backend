import e, { Router, Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import crypto from "crypto";

import asyncWrapper from "../util/asyncWrapper";
import validation from "../middleware/validation";
import Client from "../models/clients";
import LectureSchema from "../models/lectures";
import APIError from "../util/apiError";
import errors from "../util/errors";

import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();


/**
 * 강좌 등록
 * @param {Request} req
 * @param {Response} res
 */
const registeLecture = async (req, res) => {
    const { category,trainerName, agency, courseName} = req.body;
  
    const lectures = new LectureSchema();
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
    verifyToken,
  
    body("category").not().isEmpty(),
    body("trainerName").not().isEmpty(),
    body("agency").not().isEmpty(),
    body("courseName").not().isEmpty(),
    verifyToken,
    validation,
  
    asyncWrapper(registeLecture)
);
//과목 별 강좌 필터링

//강사 이름으로 강좌 검색하기

export default router;