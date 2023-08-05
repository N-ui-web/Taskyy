import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTasks from '@wasp/queries/getTasks';
import createTask from '@wasp/actions/createTask';
import deleteTask from '@wasp/actions/deleteTask';
import editTask from '@wasp/actions/editTask';
import shareTask from '@wasp/actions/shareTask';

export function TasksPage() {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const deleteTaskFn = useAction(deleteTask);
  const editTaskFn = useAction(editTask);
  const shareTaskFn = useAction(shareTask);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    image: '',
    status: 'not completed'
  });

  const handleCreateTask = () => {
    createTaskFn(newTask);
    setNewTask({
      title: '',
      description: '',
      image: '',
      status: 'not completed'
    });
  };

  const handleDeleteTask = (taskId) => {
    deleteTaskFn({ id: taskId });
  };

  const handleEditTask = (taskId, updatedTask) => {
    editTaskFn({ id: taskId, ...updatedTask });
  };

  const handleShareTask = (taskId, username) => {
    shareTaskFn({ taskId, username });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Task Title'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder='New Task Description'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type='text'
          placeholder='Image URL (optional)'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.image}
          onChange={(e) => setNewTask({ ...newTask, image: e.target.value })}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <input
              type='checkbox'
              checked={task.status === 'completed'}
              onChange={() => handleEditTask(task.id, { status: task.status === 'completed' ? 'not completed' : 'completed' })}
              className='mr-2 h-6 w-6'
            />
            <p>{task.title}</p>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <button
              onClick={() => handleShareTask(task.id, 'username')}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}