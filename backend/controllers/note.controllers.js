import Note from "../model/notes.model.js"
import mongoose from "mongoose"

export const GetNotes=async(req, res) => {

    try{
        const note = await Note.find({})
        res.status(200).json({
            success:true,
            message: note
        })

    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"server Error"
        })
        console.log("Error in fatching Notes", error.message)

    }
  
}

export const PostNotes= async(req,res) =>{

    const note = req.body
    if(!note.name){
       return res.status(400).json({
        success:false,
        message:"Empty is not allow"
       })
    }
    const NewNote= new Note(note)

    try{
        await NewNote.save()
        res.status(200).json({
            success:true,
            message:NewNote
        })

    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"server error"
        })
        console.log("Error in create Note",error.message)

    }

}

export const DeleteNotes = async(req,res) =>{
    const{id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({
            success:false,
            message:"inValid Note Id"
        })
    }
    try{
        await Note.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Note Deleted"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        })

    }
}

export const UpdateNotes =async(req,res) =>{
    const {id} = req.params
    const note = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({
            success:false,
            message:"Invalid Note ID"
        })
    }
    try{
        const UpdateNote = await Note.findByIdAndUpdate(id,note,{new:true})
        res.status(200).json({
            success:true,
            message:UpdateNote
        })

    }catch(error){
          res.status(500).json({
            success:false,
            message:"Server Error"
        })

    }
}