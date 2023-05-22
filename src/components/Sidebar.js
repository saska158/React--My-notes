import React from 'react'

export default function Sidebar(props) {
    const {notes, setCurrentNoteId, deleteNote, createNewNote, currentNote} = props

    const notesElements = notes.map(note => (
        (note.id && note.body) && 
        <div 
          key={note.id} 
          className={`note ${note.id === currentNote.id ? 'selected' : ""}`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4>{`${note.body.split(" ").slice(0, 3).join(" ")}...`}</h4>
          <button className="delete-btn" onClick={(e) => deleteNote(e, note.id)}>
            x
          </button>
        </div>
    ))

    return (
        <section className="sidebar">
            <div className="sidebar-header">
              <h3>Notes</h3>
              <button onClick={createNewNote}>+</button>
            </div>
            <div className="notes-container">
              {notesElements}
            </div>
          </section>
    )
}