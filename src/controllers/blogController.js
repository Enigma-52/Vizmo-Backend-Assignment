import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createBlog = async (req, res) => {
    const { title, content, images } = req.body;
    const authorId = req.user.userId;

    const author = await prisma.user.findUnique({
        where: { id: authorId },
        select: { name: true },
    });

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId,
                authorName: author.name,
                images,
            }
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

export const filterBlog = async (req, res) => {
    
    const { title = '', content = '', authorName = '' } = req.query;

    try {
        const andConditions = []; 

        if (title) {
            andConditions.push({
                title: {
                    contains: title,
                    mode: 'insensitive',
                }
            });
        }

        if (content) {
            andConditions.push({
                content: {
                    contains: content,
                    mode: 'insensitive',
                }
            });
        }

        if (authorName) {
            const authorUser = await prisma.user.findUnique({
                where: { name: authorName },
                select: { id: true }
            });

            if (!authorUser) {
                return res.status(404).json({ error: 'Author not found' });
            }

            andConditions.push({
                authorId: authorUser.id
            });
        }

        if (andConditions.length === 0) {
            return res.status(400).json({ error: 'At least one filter parameter must be provided' });
        }

        const blogs = await prisma.blog.findMany({
            where: {
                AND: andConditions,
            }
        });

        res.status(200).json(blogs); 
    } catch (error) {
        console.error("Error in filterBlog:", error); 
        res.status(400).json({ error: error.message });
    }
};
