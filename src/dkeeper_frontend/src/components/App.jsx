import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper_backend} from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    dkeeper_backend.createNote(newNote.title,newNote.content);
    setNotes(prevNotes => {
      return [newNote,...prevNotes];
    });
  }

  //function to do something when app render
  useEffect(()=>{
    console.log("effected");
    fetchData();
  },[]); //[] array is to say run this only one time after it get rendered

  //get data and setNotes with that backend data
  async function fetchData(){
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
