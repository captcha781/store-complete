import mongoose from "mongoose"

const Forget = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    urlExpiration: {
        type: String,
        required: true
    },
    urlCreation: {
        type: String,
        required: true
    }
})

export default mongoose.model("forgoturl", Forget)