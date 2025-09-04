import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = 4000;

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: 'User created successfully', userId: newUser.id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // JWT token generation
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    res.json({ message: 'Login successful', token });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth backend running on http://localhost:${PORT}`);
});
