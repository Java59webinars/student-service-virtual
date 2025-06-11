import User from "../model/user.js";

export async function findUserByUsername(username) {
    return User.findOne({ username });
}

export async function saveUser(userData) {
    const user = new User(userData);
    return user.save();
}
