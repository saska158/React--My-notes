import React, {useState, useEffect} from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

export default function App() {
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || [{id: "", body: ""}]) 
    const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "")
      
    
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: '#take a note' 
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(e) {
        const text = e.target.value
        setNotes(prevNotes => {
            const newArray = []
            for(let i = 0; i < prevNotes.length; i++) {
                const prevNote = prevNotes[i]
                if(prevNote.id === currentNoteId) {
                    newArray.unshift({ ...prevNote, body: text })
                } else {
                    newArray.push(prevNote)
                }
            }
            return newArray
        })
    }

    function deleteNote(event, noteId) {
      event.stopPropagation()
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }
    
    function findCurrentNote() {
        return notes.find(note => note.id === currentNoteId) || notes[0]
    }
    
   
    return (
        <main>
          {
            notes[0].id && notes[0].body 
            ?
            <>
            <Sidebar
            notes={notes}
            createNewNote={createNewNote}
            setCurrentNoteId={setCurrentNoteId}
            currentNote={findCurrentNote()}
            deleteNote={deleteNote}
           />
           <Editor
            currentNote={findCurrentNote()}
            updateNote={updateNote}
           />
           </>
          :
          <div className="no-notes">
          <h1>You have no notes</h1>
          <button 
              className="first-note-btn" 
              onClick={createNewNote}>
              Create one now
          </button>
      </div>
          }
        </main>
    )
}