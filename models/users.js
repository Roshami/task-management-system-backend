import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isPersonal: {
        type: Boolean,
        required: true,
        default: true,
    },
    companyName: {
        type: String,
        required: true,
        default: "Personal",
    },
}, {
    timestamps: true,
});

const Users = mongoose.model("Users", userSchema);

export default Users;