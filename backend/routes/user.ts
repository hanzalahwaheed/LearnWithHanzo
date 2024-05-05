import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password, name } = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      c.status(403);
      return c.json("User already exists");
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    return c.json(error);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid Username or Password" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ token });
});

export { userRouter };
