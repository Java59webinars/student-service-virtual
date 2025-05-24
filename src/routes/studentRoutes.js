import express from "express";
import {
    addStudent, findStudent, deleteStudent, updateStudent, addScore, findByName, findByMinScore, countByNames
} from "../controller/studentController.js";

const router = express.Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudent);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);
router.patch('/score/student/:id', addScore);
router.get('/students/name/:name', findByName);
router.get('/quantity/students', countByNames);
router.get('/students/exam/:exam/minscore/:minScore', findByMinScore);


export default router;