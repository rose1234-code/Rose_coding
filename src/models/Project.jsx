import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    // Informations générales
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    
    // Relations
    instructor: {
        type: String,
        ref: "User"
    },
    // Dates et délais
    startDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    
    // Configuration du projet
    maxScore: {
        type: Number,
        default: 100,
        min: 0
    },
    // Ressources du projet
    attachments: [{
        fileName: String,
        fileUrl: String,
        fileSize: Number,
        fileType: String
    }],
    
    resources: [{
        title: String,
        url: String,
        description: String
    }],
    
    // Instructions détaillées (éditeur riche)
    instructions: {
        type: String,  // HTML / Markdown
        default: ""
    },
    
    
    maxSubmissions: {
        type: Number,
        default: 1
    },
    
    isPublished: {
        type: Boolean,
        default: false
    },
    
    // Visibilité
    isGroupProject: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true })
 
const Project=mongoose.models.Project || mongoose.model('Project', projectSchema)
export default Project