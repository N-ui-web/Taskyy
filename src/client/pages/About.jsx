import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTasks from '@wasp/queries/getTasks';

export function About() {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCompleteTask = (taskId) => {
    completeTask({ taskId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>About Tasky</h1>
      <p className='text-lg'>Tasky is a web app that allows you to create, share, delete and edit tasks. It provides an easy way to manage your tasks and collaborate with others.</p>
      <p className='text-lg mt-4'>Tasky is built using Wasp, a full-stack web app framework that uses React, NodeJS and Prisma. It provides a powerful and flexible platform for developing web apps.</p>

      <h2 className='text-2xl font-bold mt-8 mb-4'>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <h3 className='text-lg font-bold'>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button
            onClick={() => handleCompleteTask(task.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
          >
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}