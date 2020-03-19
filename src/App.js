import React, { useState, useEffect } from 'react';
import { firestore } from './index'
import Task from './Task'
import './Task.css'

function App() {

  const [tasks, setTasks] = useState([])

  const [name, setName] = useState('')

  useEffect(() => {
    reciveData()
  }, [])
  const reciveData = () => {

    firestore.collection("tasks").onSnapshot((snapshot) => {
      let mytask = (snapshot.docs.map(d => {

        const { id, name } = d.data()
        console.log(id, name);
        return { id, name }
      }));
      setTasks(mytask)
    })
    console.log(tasks);

  }

  const addTask = () => {
    const id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const deleteTask = (id) => {
    firestore.collection("tasks").doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }


  const renderTask = () => {
    if (tasks.length && tasks) {


      return (
        tasks.map((task, index) => {
          return (
            <Task key={index} task={task}
              deleteTask={deleteTask}
              editTask={editTask} />
          )
        }
        ))
    }
    else {
      return (
        <li> No task </li>
      )
    }
  }

  return (
    <div className="main" >
      <div className="">

        <h1>Todo</h1>
        <div>
          <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} />
          <button className="blue" onClick={addTask}>add</button>
        </div>
        <ul style={{ display: "flex", listStyle: "none" }} className="" >
          {renderTask()}
        </ul>
      </div>
    </div>
  );
}

export default App;
