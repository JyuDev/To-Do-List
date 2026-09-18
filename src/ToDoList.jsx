import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export const ToDoList = () => {

    const [tasks, setTask] = useState([])
    const [newTask, setNewTask] = useState("");
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

    const inputChange = (event) => {
        setNewTask(event.target.value);
    }

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTask(t => [...t, newTask]);
            setNewTask("");
        }
    }

    // Opens the modal instead of deleting immediately
    const requestDeleteTask = (index) => {
        setPendingDeleteIndex(index);
    }

    // Called when user confirms in the modal
    const confirmDeleteTask = () => {
        const updatedTask = tasks.filter((_, i) => i !== pendingDeleteIndex);
        setTask(updatedTask);
        setPendingDeleteIndex(null);
    }

    // Called when user cancels or closes the modal
    const cancelDeleteTask = () => {
        setPendingDeleteIndex(null);
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] =
                [updatedTask[index - 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] =
                [updatedTask[index + 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    return (
        <div className="main-container">

            <div className="container">

            <h1>To-Do-List</h1>

            <div className="container-input">
                <input
                    className="input"
                    type="text"
                    placeholder="Enter your Task..."
                    value={newTask}
                    onChange={inputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    }}
                />
                <button className="add-btn" onClick={addTask}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-btn" onClick={() => requestDeleteTask(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="move-up-btn" onClick={() => moveTaskUp(index)}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button className="move-down-btn" onClick={() => moveTaskDown(index)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </li>
                )}
            </ol>

            {/* Modal renders when pendingDeleteIndex is not null */}
            {pendingDeleteIndex !== null && (
                <div className="modal-overlay" onClick={cancelDeleteTask}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <p>Do you really want to delete this task?</p>
                        <p className="modal-task-preview">"{tasks[pendingDeleteIndex]}"</p>
                        <div className="modal-actions">
                            <button className="modal-cancel-btn" onClick={cancelDeleteTask}>
                                Cancel
                            </button>
                            <button className="modal-confirm-btn" onClick={confirmDeleteTask}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

        </div>
    )
}