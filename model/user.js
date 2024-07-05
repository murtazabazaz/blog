import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);
export default User;