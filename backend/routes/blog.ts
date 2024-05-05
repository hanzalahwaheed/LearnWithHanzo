import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// auth middleware
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization");
  if (!token) {
    c.status(403);
    return c.json("Unauthorized");
  }
  const userId = await verify(token, c.env.JWT_SECRET);
  if (userId) {
    c.set("userId", userId.id);
    await next();

    console.log(userId);
  } else {
    c.status(403);
    return c.json("Unauthorized");
  }
});

// new post
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const context_userId = c.get("userId");
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: context_userId,
    },
  });

  console.log(post);
  return c.json(post.id);
});

// update post
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title ?? undefined,
      content: body.content ?? undefined,
    },
  });
  return c.json(post.id);
});

// get single post
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: { id },
    });
    return c.json(post);
  } catch (error) {
    c.status(411);
    return c.json(error);
  }
});

// get all posts
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // implement pagination (future scope)
    const posts = await prisma.post.findMany();
    return c.json(posts);
  } catch (error) {
    c.status(411);
    return c.json(error);
  }
});

export { blogRouter };
