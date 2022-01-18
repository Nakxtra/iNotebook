import React from 'react'
import { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';

const NotesItem = (props) => {
    const { deleteNote} = useContext(NoteContext)
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={() => { return (deleteNote(note._id) && props.showAlert("Note Deleted Successfully", "success")) }}></i>

                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>

        </div>
    )
}

export default NotesItem
