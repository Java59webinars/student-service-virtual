import express from "express";
import {
    addStudent, findStudent, deleteStudent, updateStudent, addScore, findByName, findByMinScore, countByNames
} from "../controller/studentController.js";
import {checkPermissions} from "../services/authService.js";

const router = express.Router();

//USER Level
router.get('/student/:id', findStudent);
router.get('/students/name/:name', findByName);
router.get('/quantity/students', countByNames);
router.get('/students/exam/:exam/minscore/:minScore', findByMinScore);

//MODERATOR Level
router.patch('/student/:id', checkPermissions('updateAny','student'), updateStudent);
router.patch('/score/student/:id',checkPermissions('updateAny','student'), addScore);

//ADMIN Level
router.post('/student', checkPermissions('createAny','student'),addStudent);
router.delete('/student/:id',checkPermissions('deleteAny','student'), deleteStudent);




export default router;