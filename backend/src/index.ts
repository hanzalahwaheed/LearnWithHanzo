import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const authHeader = c.req.header("Authorisation");
  if (!authHeader) return c.status(401);
  const decoded = await verify(authHeader, c.env.JWT_SECRET);
  if (!decoded.id) return c.status(403);
  await next();
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password, name } = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  
  if (user) return c.status(403);

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
  return c.json({ token });
});

app.post("/api/v1/user/signin", async (c) => {
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
    return c.json({ error: "User not found" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ token });
});

app.post("/api/v1/blog", (c) => {
  return c.text("blogPost");
});

app.put("/api/v1/blog", (c) => {
  return c.text("blogUpdate");
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("blogSingle");
});

app.get("/api/v1/blog", (c) => {
  return c.text("allBlogs");
});

export default app;
