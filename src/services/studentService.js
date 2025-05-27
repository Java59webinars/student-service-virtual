import * as repo from '../repository/studentRepository.js'

export const addStudent = async ({id, name, password}) => {
    const existing = await repo.findStudentById(id);
    if (existing) {
        return false;
    }
    await repo.createStudent({_id: id, name, password});
    return true;
}

export const findStudent = async (id) => {
    return await repo.findStudentById(id);
}

export const deleteStudent = async (id) => {
    return await repo.deleteStudentById(id);
}

export const updateStudent = async (id, data) => {
    return await repo.updateStudent(id, data);
}

export const addScore = async (id, exam, score) => {
    return await repo.updateStudentScore(id, exam, score);
}

export const findByName = async (name) => {
    return await repo.findStudentsByName(name);
}

export const countByNames = async (names) => {
    return await repo.countStudentsByNames(names);
}

export const findByMinScore = async (exam, minScore) => {
    return await repo.findStudentsByMinScore(exam, minScore);
}
