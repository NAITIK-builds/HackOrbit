/*
  # Initial HackOrbit Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `bio` (text)
      - `avatar_url` (text)
      - `year` (text)
      - `branch` (text)
      - `roll_number` (text)
      - `phone` (text)
      - `location` (text)
      - `github_url` (text)
      - `linkedin_url` (text)
      - `website_url` (text)
      - `skills` (text array)
      - `level` (text)
      - `points` (integer)
      - `streak` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `todos` - Sample todo items for users
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `completed` (boolean)
      - `priority` (text)
      - `due_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `events` - Club events
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `location` (text)
      - `category` (text)
      - `max_participants` (integer)
      - `organizer_id` (uuid, references profiles)
      - `image_url` (text)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `event_registrations` - Event registrations
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `user_id` (uuid, references profiles)
      - `registered_at` (timestamp)

    - `projects` - User projects
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `user_id` (uuid, references profiles)
      - `tech_stack` (text array)
      - `github_url` (text)
      - `demo_url` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `achievements` - User achievements
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `earned_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  bio text,
  avatar_url text,
  year text,
  branch text,
  roll_number text,
  phone text,
  location text DEFAULT 'Kanpur, India',
  github_url text,
  linkedin_url text,
  website_url text,
  skills text[] DEFAULT '{}',
  level text DEFAULT 'Beginner',
  points integer DEFAULT 0,
  streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location text,
  category text DEFAULT 'Workshop' CHECK (category IN ('Workshop', 'Competition', 'Seminar', 'Bootcamp', 'Tech Talk')),
  max_participants integer DEFAULT 50,
  organizer_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  image_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tech_stack text[] DEFAULT '{}',
  github_url text,
  demo_url text,
  status text DEFAULT 'In Progress' CHECK (status IN ('Planning', 'In Progress', 'Completed', 'On Hold')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  icon text DEFAULT '🏆',
  earned_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Todos policies
CREATE POLICY "Users can view own todos" ON todos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own todos" ON todos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own todos" ON todos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own todos" ON todos FOR DELETE USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Event organizers can update their events" ON events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Event organizers can delete their events" ON events FOR DELETE USING (auth.uid() = organizer_id);

-- Event registrations policies
CREATE POLICY "Users can view event registrations" ON event_registrations FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registrations" ON event_registrations FOR DELETE USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Anyone can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "System can insert achievements" ON achievements FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for event images
CREATE POLICY "Event images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
CREATE POLICY "Authenticated users can upload event images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update event images they uploaded" ON storage.objects FOR UPDATE USING (bucket_id = 'event-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete event images they uploaded" ON storage.objects FOR DELETE USING (bucket_id = 'event-images' AND auth.uid()::text = (storage.foldername(name))[1]);