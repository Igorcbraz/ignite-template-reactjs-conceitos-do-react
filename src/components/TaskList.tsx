import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { isMetaProperty } from '@babel/types';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle !== ''){
      const randomNumber = Math.floor(Math.random() * 1000); // Generates random integer from 0 to 99:
      const newTask: Task = {
        id: randomNumber,
        title: `${newTaskTitle}`,
        isComplete: false
      }

      setTasks(task => [...tasks, newTask]); //"Extends" old tasks array and add newTask item
      setNewTaskTitle('');
    } else {
      alert('Task cannot be empty !')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    let newTaskArray = [...tasks]; //Clone old tasks array
    newTaskArray[taskIndex].isComplete = !newTaskArray[taskIndex].isComplete; //Invert the boolean value from task with id = params id 

    setTasks(newTaskArray); //Set the new array(newTaskArray) to Tasks state
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    let newTaskArray = [...tasks]; //Clone old tasks array
    newTaskArray.splice(taskIndex, 1); //Remove 1 item with index = taskIndex

    setTasks(newTaskArray) //Set the new array(newTaskArray) to Tasks state
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}