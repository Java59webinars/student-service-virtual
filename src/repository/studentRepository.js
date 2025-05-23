let collection;

export function init(db) {
    collection = db.collection("college");
}

export const addStudent = async ({id, name, password}) => {
    const existing = await collection.findOne({_id: id});
    if (existing) {
        return false;
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
    return true;
}

export const findStudent = async (id) => {
    return await collection.findOne({_id: id});
}

export const deleteStudent = async (id) => {
    return await collection.findOneAndDelete({_id: id});
}

export const updateStudent = async (id, data) => {
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument: 'after'}
    )
}

export const addScore = async (id, exam, score) => {
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: {[`scores.${exam}`]: score}},
    )
}

export const findByName = async (name) => {
    return await collection.find({name: {$regex: `^${name}$`, $options: 'i'}}).toArray();
}

// export const countByNames = (names) => {
//     names = names.map(name => name.toLowerCase());
//     return Array.from(students.values()).filter(s => names.includes(s.name.toLowerCase())).length;
// }
//
// export const findByMinScore = (exam, minScore) => {
//     return Array.from(students.values()).filter(s => s.scores[exam] >= minScore);
// }
