import React from 'react'
import './Task.css'


export default (props) => {
    const { task, deleteTask, editTask } = props

    return (
        

            <li >
                <div className="id" >
                    {task.id}
                </div>
                <div className="name" >
                    {task.name}
                </div>
                <div className=" btn container">
                    <button className="red" onClick={() => deleteTask(task.id)} >delete</button>
                    <button className="green" onClick={() => editTask(task.id)} >edit</button>
                </div>
            </li>
    

    )
}