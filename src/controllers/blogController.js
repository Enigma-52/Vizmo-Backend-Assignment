import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBlog = async (req, res) => {
    const { title, content, images } = req.body;
    const authorId = req.user.userId;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId,
                images,
            },
        });

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await prisma.blog.findUnique({ where: { id } });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, images } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: {
                title,
                content,
                images,
            },
        });

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.blog.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
