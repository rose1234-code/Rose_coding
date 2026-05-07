import mongoose,{Schema} from "mongoose";


const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    type: {
        type: String,
        enum: ["video", "text", "quiz", "assignment", "resource"],
        default: "text"
    },
    content: {
        type: String, // Texte riche en HTML
        default: ""
    },
    videoUrl: {
        type: String  // Pour les leçons vidéo
    },
    videoDuration: {
        type: Number  // en secondes
    },
    resources: [{
        name: String,
        url: String,
        type: String  // PDF, PPT, DOC, etc.
    }],
    order: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Lesson=mongoose.models.Lesson || mongoose.model('Lesson',lessonSchema)
export default Lesson