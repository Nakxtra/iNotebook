import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'
import { useState } from 'react';

const AddNotes = (props) => {

    const {addNote} = useContext(NoteContext);
    const [note, setNote] = useState({title: '', description: '', tag: ''})

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: '', description: '', tag: ''})
        props.showAlert("Note Added Successfully", "success");
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name="description" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={handleChange}/>
                    </div>
                    <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes
