const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must contain at least 1 characters').isLength({min: 1}),
    body('description', 'Description must contain at least 1 characters').isLength({min:1})
], async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Creatina a Note
        const note = await Note.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id // user id is stored in user variable and id keyword will store id of corresponding note
        })
        // Or
        // const {title, description, tag} = req.body;
        // const note = await new Note({
        //     title, description, tag, user: req.user.id
        // })
        // const saveNote = await note.save();
        
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }
})

// ROUTE 2: Fetching all the notes of user using: POST "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        // Finding all notes having the user value same as its id
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
        
    }
})

// Route 3: Udate an existing Note using: PUT "/api/notes/updatenode". Login required
router.put('/updatenote/:id', fetchuser, async(req, res)=>{
    try {
        // Getting the values of Notes from body
        const {title, description, tag} = req.body;
        
        // Creating newNote object
        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        // Finding the note by id
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Invalid!!")}
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Updating the Note
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        
        res.json(note);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
        
    }
    
})

// Route 4: Delete an existing Note using: DELETE "/api/notes/deletenode". Login required
router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
    try{
        // Finding the note by id
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Invalid!!")}
        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Finding the Note and then delete
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured");
    }
})

module.exports = router;