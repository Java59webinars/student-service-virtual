import Student from "../model/student.js";

export async function createStudent(student) {
    return Student.create(student);
}

export async function findStudentById(id) {
    return Student.findById(id);
}

export async function deleteStudentById(id) {
    return Student.findByIdAndDelete(id);
}

export async function updateStudent(id, data) {
    return Student.findByIdAndUpdate(id, data, {new: true})
}

export async function updateStudentScore(id, exam, score) {
    return Student.findByIdAndUpdate(id, {[`scores.${exam}`]: score}, {new: true})
}

export async function findStudentsByName(name) {
    return Student.find({name: new RegExp(`^${name}$`, 'i')});
}

export async function countStudentsByNames(names) {
    const regexConditions = names.map(name => ({
        name: new RegExp(`^${name}$`, 'i')
    }));
    return Student.countDocuments({$or: regexConditions});
}

export async function findStudentsByMinScore(exam, minScore) {
    return Student.find({[`scores.${exam}`]: {$gte: minScore}});
}
