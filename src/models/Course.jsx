import mongoose,{Schema} from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type:String,
        ref: "User",
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "all"],
        default: "beginner"
    },
    language: {
        type: String,
        default: "fr"
    },
    
    estimatedDuration: {
        type: Number, // en heures
        min: 0
    },
    coverImage: {
        type: String
    },
    whatYouWillLearn: [{
        type: String
    }],
    
    totalStudents: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Course=mongoose.models.Course || mongoose.model('Course',courseSchema)
export default Course