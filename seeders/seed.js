const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BlogSport', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

async function seedDatabase() {
    try {
        // Clear existing data (optional, remove if you want to append)
        await User.deleteMany({});
        await Blog.deleteMany({});
        await Comment.deleteMany({});
        console.log('Cleared existing data');

        // Create Users
        const users = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'user', // In practice, hash this with bcrypt
                role: 'user'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'user',
                role: 'user'
            },
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin',
                role: 'admin'
            }
        ]);
        console.log('Users created:', users);

        // Create Blogs
        const blogs = await Blog.insertMany([
            {
                title: 'My First Blog',
                content: 'This is my first blog post!',
                author: users[0]._id // John Doe
            },
            {
                title: 'React Tips',
                content: 'Here are some React tips...',
                author: users[1]._id // Jane Smith
            },
            {
                title: 'MERN Stack Guide',
                content: 'Building apps with MERN...',
                author: users[0]._id // John Doe
            }
        ]);
        console.log('Blogs created:', blogs);

        // Create Comments
        const comments = await Comment.insertMany([
            {
                content: 'Great post!',
                blog: blogs[0]._id, // My First Blog
                user: users[1]._id  // Jane Smith
            },
            {
                content: 'Thanks for the tips!',
                blog: blogs[1]._id, // React Tips
                user: users[0]._id  // John Doe
            },
            {
                content: 'Very helpful!',
                blog: blogs[2]._id, // MERN Stack Guide
                user: users[2]._id  // Admin User
            }
        ]);
        console.log('Comments created:', comments);

        // Update Blogs with Comment References
        await Blog.updateOne(
            { _id: blogs[0]._id },
            { $push: { comments: comments[0]._id } }
        );
        await Blog.updateOne(
            { _id: blogs[1]._id },
            { $push: { comments: comments[1]._id } }
        );
        await Blog.updateOne(
            { _id: blogs[2]._id },
            { $push: { comments: comments[2]._id } }
        );
        console.log('Blogs updated with comments');

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close(); // Close connection when done
    }
}

// Run the seeding function
// seedDatabase()/;

module.exports = seedDatabase;