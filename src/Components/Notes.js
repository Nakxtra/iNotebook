import React, { useRef, useEffect, useState, useContext  } from "react";
import NoteContext from '../Context/Notes/NoteContext'
import NotesItem from "./NotesItem";
import AddNotes from "./AddNotes";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const ref = useRef(null);
    let history = useHistory();

    useEffect(() => {
        console.log(localStorage);
        if(localStorage.getItem('token')){
            getNotes();
        }

        else{
            history.push('/login')
        }
        // eslint-disable-next-line 
    }, [])

    const [note, setNote] = useState({id:'', etitle: '', edescription: '', etag: '' })

    const handleSubmit = () => {
        ref.current.click();
        // console.log(note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Note Edited Successfully", "success");
    }

    const handleChange = (e) => {
        // console.log(e);
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});

    }

    return (
        <>
            <AddNotes showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleChange} minLength={1} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text"  value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={handleChange} minLength={1} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text"  value={note.etag} className="form-control" id="etag" name="etag" onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<1 || note.edescription.length<1} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 mx-1">
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length===0 && 'No notes to display'}

                </div>
                {notes.map((note) => {
                    return <NotesItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    );
};

export default Notes;
