/*
  # Sample Data for HackOrbit

  1. Sample Events
  2. Sample Todos
  3. Sample Projects
  4. Sample Achievements

  Note: This migration adds sample data for development and testing.
  Remove or modify for production use.
*/

-- Insert sample events
INSERT INTO events (title, description, date, location, category, max_participants, tags) VALUES
('Annual Hackathon 2024', 'Join us for the biggest coding competition of the year! Build innovative solutions in 48 hours.', '2024-04-15 09:00:00+00', 'PSIT Main Auditorium', 'Competition', 200, ARRAY['hackathon', 'coding', 'innovation', 'prizes']),
('React Workshop: Advanced Patterns', 'Deep dive into advanced React patterns including hooks, context, and performance optimization.', '2024-03-28 14:00:00+00', 'Computer Lab 2', 'Workshop', 60, ARRAY['react', 'javascript', 'frontend', 'workshop']),
('AI & Machine Learning Seminar', 'Industry experts discuss the latest trends in AI and ML. Q&A session included.', '2024-03-30 11:00:00+00', 'Seminar Hall', 'Seminar', 150, ARRAY['AI', 'machine learning', 'seminar', 'career']),
('Open Source Contribution Drive', 'Learn how to contribute to open source projects and make your first contribution!', '2024-04-05 10:00:00+00', 'Computer Lab 1', 'Workshop', 40, ARRAY['open source', 'github', 'collaboration', 'beginner']),
('Mobile App Development Bootcamp', 'Build your first mobile app using React Native. From setup to deployment.', '2024-04-12 09:00:00+00', 'Tech Hub', 'Bootcamp', 35, ARRAY['mobile', 'react native', 'bootcamp', 'app development']),
('Tech Talk: Future of Web Development', 'Industry leader shares insights on emerging web technologies and career opportunities.', '2024-03-25 16:00:00+00', 'Main Auditorium', 'Tech Talk', 120, ARRAY['web development', 'career', 'industry insights']);

-- Note: Sample todos, projects, and achievements will be created when users sign up
-- This is because they require user_id references which are created during authentication