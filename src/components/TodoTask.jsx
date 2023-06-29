import React from 'react'

const TodoTask = ({id, text, handleDone}) => {
    console.log("Task: " + id)

  return (
    <div>
      <ul>
        <li key={id}>
          {text}
          <button className='done-button' onClick={() => handleDone(id)}>Done</button>
        </li>
      </ul>
    </div>
  )
}

export default React.memo(TodoTask)