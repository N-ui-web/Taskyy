import HttpError from '@wasp/core/HttpError.js'

export const getTasks = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  return context.entities.Task.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: {
      id: args.id,
      OR: [
        { userId: context.user.id },
        { sharedWith: { some: { id: context.user.id } } }
      ]
    }
  });

  if (!task) { throw new HttpError(404, `Task with id ${args.id} not found`) };

  return task;
}