import { useCallback, useState } from "react";
import TodoTask from "./TodoTask";

const ToDoList = () =>{

    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([{id: 1, text: "Task 1", done: false},{id: 2, text: "Task 2", done: false}])
    const [completedTasks, setCompletedTasks] = useState([]);

    
      const handleChange = (event) => {
        const value = event.target.value
        setInputValue(value);    
      }


      const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
          id: tasks.length + 1,
          text: inputValue,
          done: false
        }

        setTasks((prevState) => [...prevState, task])
        setInputValue("")
      }

            
      
      const handleDone = useCallback(((taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        const completedTask = tasks.find((task) => task.id === taskId)
      
        setTasks(updatedTasks)
        setCompletedTasks((prevState) => [...prevState, completedTask])
      }), [tasks])


      const handleRemove = useCallback(((taskId) => {
        setCompletedTasks((prevState) => prevState.filter((task) => (
            task.id !== taskId)))
      }), [])


      const handleReturnToPending = useCallback(((taskId) => {
        const updatedCompletedTasks = completedTasks.filter(
          (task) => task.id !== taskId
        );
        const taskToReturn = completedTasks.find((task) => task.id === taskId);

        setCompletedTasks(updatedCompletedTasks)
        setTasks((prevState) => [...prevState, taskToReturn])
      }), [completedTasks])
      

        return(
          <div className="container">
            <div className="tasks">
              <form onSubmit={handleSubmit}>
                <label htmlFor="taskInput">To Do:</label>
                <input id="taskInput" value={inputValue} onChange={handleChange} type="text" />
                <button type="submit">Add Task</button>
              </form>

              {tasks.map((task) => (
                <TodoTask
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  done={task.done}
                  handleDone={handleDone}
                />
              ))}
            </div>

            <div className="completed-tasks">
              <h2>Completed Tasks</h2>
                <ul>
                  {completedTasks.map((task) => (
                    <li key={task.id}>{task.text}
                      <button onClick={() => handleRemove(task.id)} className="remove-button">Remove</button>
                      <button onClick={() => handleReturnToPending(task.id)} className="return-button">Return</button>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
            
            
        )
    }


export default ToDoList