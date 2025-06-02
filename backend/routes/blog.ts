import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@hanzalahwaheed/h2wh-common";
import { JWTPayload } from "hono/utils/jwt/types";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user: { id: string; name: string } | JWTPayload;
  };
}>();

// get all posts
/* 
Note that /bul is declared above the middleware to avoid it getting authorised on fetching all blogs 
*/
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // implement pagination (future scope)
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(posts);
  } catch (error) {
    c.status(500);
    return c.json({ error });
  }
});

/*
Note that getAllPosts endpoint is declared before getSinglePost endpoint to prevent overlap of /:id as /bulk 
*/

// get single post
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(post);
  } catch (error) {
    c.status(500);
    return c.json({ error });
  }
});

// auth middleware
blogRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("user", user);
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

  const user = c.get("user");
  const context_userId = user.id;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();

  const publishedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: context_userId,
      publishedDate: publishedDate,
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

export { blogRouter };
