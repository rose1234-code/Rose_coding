import mongoose,{Schema} from "mongoose";

// 8. Progression des leçons
const lessonProgressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lessonId: {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number, // 0 à 100
      default: 0
    }
},{timestamps:true});

const LessonProgression=mongoose.models.LessonProgress || mongoose.model('Progession',lessonProgressSchema)
export default LessonProgression