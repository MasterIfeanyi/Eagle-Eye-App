import mongoose from 'mongoose'

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    anonymous: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no',
    },
    userId: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
}, { timestamps: true })

export default mongoose.models.Report || mongoose.model('Report', ReportSchema)