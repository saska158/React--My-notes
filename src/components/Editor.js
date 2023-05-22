import React from 'react'

export default function Editor({currentNote, updateNote}) {
    return (
        <section className="editor">
            <textarea 
              value={currentNote.body}
              onChange={updateNote}
            />
          </section>
    )
}