import * as repo from '../repository/studentRepository.js'

export const addStudent = async ({id, name, password, scores}) => {
    const existing = await repo.findStudentById(id);
    if (existing) {
        return false;
    }
    await repo.createStudent({_id: id, name, password, scores}).catch(err => {
        console.error(err);
    })
    return true;
}

export const findStudent = async (id) => {
    const student = await repo.findStudentById(id);
    return student
}

export const deleteStudent = async (id) => {
    const student = await repo.deleteStudentById(id);
    return student;
}

export const updateStudent = async (id, data) => {
    const student =await repo.updateStudent(id, data);
    return student
}

export const addScore = async (id, exam, score) => {
    return await repo.updateStudentScore(id, exam, score);
}

export const findByName = async (name) => {
    const students = await repo.findStudentsByName(name);
    return students

}

export const countByNames = async (names) => {
    return await repo.countStudentsByNames(names);
}

export const findByMinScore = async (exam, minScore) => {
    return await repo.findStudentsByMinScore(exam, minScore);
}
