import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other', 'Male', 'Female', 'Other'], //Restringe la entrada
        default: 'Other'
    },
    age: { 
        type: Number,
        required: true,
        min: 1,  // Edad mínima
        max: 99 // Edad máxima 
    },
    creationDate: {
        type: Date,
        default: Date.now, // Establecer fecha actual por defecto
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isEmailSent: {
        type: Boolean,
        default: false
    },
});

export const CaseModel = mongoose.model("Case", caseSchema)