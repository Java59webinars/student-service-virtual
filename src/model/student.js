import mongoose from "mongoose";
import bcrypt from "bcrypt";
import logger from "../logger/logger.js";

const studentSchema = new mongoose.Schema({
    _id: {type: Number, required: true, min: [100000000, 'ID must be greater than 100000000'], max:[999999999, 'ID must be less than 999999999']},
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    password: {type: String, required: true, minlength: 8},
    scores: {
        type: Map,
        key: String,
        of: Number,
        default: {}
    }
}, {
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
           ret.id = ret._id;
           delete ret._id;
           delete ret.password;
           return ret;
        }
    }
})

// Hash password if needed
async function hashPasswordIfNeeded(password) {
    if (!password || password.startsWith('$2b$')) return password; // уже захеширован
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// pre-save (.save())
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await hashPasswordIfNeeded(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

// pre-findOneAndUpdate ( findByIdAndUpdate and others)
studentSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (!update?.password) return next();

    try {
        update.password = await hashPasswordIfNeeded(update.password);
        this.setUpdate(update);
        next();
    } catch (err) {
        next(err);
    }
});

studentSchema.virtual("averageScore").get(function () {
    if(!this.scores || this.scores.size === 0) {
        logger.warn(`Student ${this._id} : ${this.scores}`);
        return null;
    }
    const scoresArray = [...this.scores.values()];
    const sum = scoresArray.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / scoresArray.length) *100)/100;
})

const Student = mongoose.model("Student", studentSchema, 'college');
export default Student;
