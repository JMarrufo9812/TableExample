import faker from 'faker'
import { User } from '@/entities/user.ts'

export const generateUsers = (count: number): User[] => {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const user: User = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      date: faker.date.past(),
      status: faker.datatype.boolean(),
    };

    users.push(user);
  }

  return users;
};
