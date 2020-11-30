import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123123', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123123', 10),
    },
    {
        name: 'José Díaz',
        email: 'jose@example.com',
        password: bcrypt.hashSync('123123', 10),
    },
    {
        name: 'Carlos Vive',
        email: 'carlos@example.com',
        password: bcrypt.hashSync('123123', 10),
    },
]

export default users;