import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.create({
    data: {
      title: args.title,
      description: args.description,
      image: args.image,
      status: args.status || 'not completed',
      userId: context.user.id
    }
  });
}

export const deleteTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Task.delete({
    where: { id: args.id }
  });
}

export const editTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Task.update({
    where: { id: args.id },
    data: { title: args.title, description: args.description, image: args.image, status: args.status }
  });
}

export const shareTask = async (args, context) => {

  if (!context.user) {
    throw new HttpError(401);
  }

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId }
  });

  if (task.userId !== context.user.id) {
    throw new HttpError(403);
  }

  const userToShareWith = await context.entities.User.findUnique({
    where: { username: args.username }
  });

  if (!userToShareWith) {
    throw new HttpError(404, 'User not found');
  }

  await context.entities.Task.update({
    where: { id: args.taskId },
    data: {
      sharedWith: {
        connect: { id: userToShareWith.id }
      }
    }
  });

  return true;
}