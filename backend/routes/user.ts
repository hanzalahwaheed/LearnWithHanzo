import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signUpInput, signInInput } from "@hanzalahwaheed/h2wh-common";
import { verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user: { id: string; name: string };
  };
}>();

userRouter.get("/me", async (c) => {
  try {
    const token = c.req.header("authorization") || "";
    if (!token) return c.json({ status: false, message: "unauthorized" });
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) return c.json({ status: false, message: "unauthorized" });
    c.set("user", user);
    return c.json({ status: true, user: user });
  } catch (error) {
    return c.json({ error: error });
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Imputs not correct" });
    }
    const { email, name, password } = body;
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
    const token = await sign(
      { id: newUser.id, name: newUser.name },
      c.env.JWT_SECRET
    );
    return c.json({ token });
  } catch (error) {
    return c.json(error);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Imputs not correct" });
  }
  const { email, password } = body;

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

  const token = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);
  return c.json({ token });
});

export { userRouter };
