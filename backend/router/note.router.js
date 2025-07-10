import express from "express"

import { DeleteNotes, GetNotes, PostNotes, UpdateNotes } from "../controllers/note.controllers.js";

const router = express.Router()

router.get("/",GetNotes);

router.post("/", PostNotes)

router.delete("/:id", DeleteNotes)

router.put("/:id", UpdateNotes)
export default router