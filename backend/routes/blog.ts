import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@hanzalahwaheed/h2wh-common";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// get all posts
/* Note that /bul is declared above the middleware to avoid it getting authorised on fetching all blogs */
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

// auth middleware
blogRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const userId = await verify(token, c.env.JWT_SECRET);
    c.set("userId", userId.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ message: "Unauthorized", error: error });
  }
});

// new post
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs",
    });
  }
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
  return c.json(post.id);
});

// update post
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs",
    });
  }
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

/*
Note that getAllPosts endpoint is declared before getSinglePost endpoint to prevent overlap of /:id as /bulk 
*/

export { blogRouter };
