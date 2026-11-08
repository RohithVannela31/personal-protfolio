const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './config/.env'});
const User = require('./models/userModel');
const Project = require('./models/projectsModel');

async function seed() {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log('Connected to MongoDB');

  // Check if admin exists
  let admin = await User.findOne({ email: 'admin@portfolio.com' });
  if (!admin) {
    admin = await User.create({
      name: 'Rohith Vannela',
      email: 'admin@portfolio.com',
      password: 'adminPassword123',
      role: 'admin'
    });
    console.log('Created Admin User: admin@portfolio.com / adminPassword123');
  } else {
    console.log('Admin already exists');
  }

  // Add sample project if none exists
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.create({
      title: 'MERN Personal Portfolio',
      description: 'A full-stack personal portfolio website built with MongoDB, Express.js, React, and Node.js. Features admin panel, JWT authentication, and project showcase.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
      githubLink: 'https://github.com/RohithVannela31/personal-protfolio',
      liveLink: 'http://localhost:5173',
      imageUrl: ''
    });
    console.log('Created Sample Project');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
