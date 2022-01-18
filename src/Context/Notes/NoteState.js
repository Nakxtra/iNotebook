import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  // const s1 = {
  //     "name": "Nakshatra",
  //     "branch": "cse"
  // }
  // const [state, setState] = useState(s1);
  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name": "Tanu",
  //             "branch": "It"
  //         })
  //     }, 1000);
  // }

  const host = "http://localhost:5000"

  const notesVal = []

  const getNotes = async()=>{
    const response = await fetch( `${host}/api/notes/fetchallnotes` , {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    }); 
    // console.log(await response.json()); 
    setNotes(await response.json()); 
  }
  
  const [notes, setNotes] = useState(notesVal);
  
  const addNote = async (title, description, tag) => {
    const response = await fetch( `${host}/api/notes/addnote` , {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    }); 
    const data = await response.json()
    
    setNotes(notes.concat(data))
  }
  
  const deleteNote = async (id)=>{
    console.log(id);
    const response = await fetch( `${host}/api/notes/deletenote/${id}` , {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    }); 
    
    console.log(await response.json());
    
    // const newNotes = notes.filter((note)=>{return note._id!==id})
    const newNotes = [];
    notes.map((note)=>{
      if(note._id!==id)
      newNotes.push(note)
      
      return newNotes
    })
    console.log(newNotes)
    setNotes(newNotes);
  }
  
  const editNote = async (id, title, description, tag)=>{
    console.log(id);
    const response = await fetch( `${host}/api/notes/updatenote/${id}` , {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    }); 
    
    console.log(await response.json());

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      if(newNotes[index]._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
    }
    setNotes(newNotes);
    // notes.map((note)=>{
      //   if(note._id===id)
      //     note.title = title
      //     note.description = description
      //     note.tag = tag
      // })
    }
    
    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;