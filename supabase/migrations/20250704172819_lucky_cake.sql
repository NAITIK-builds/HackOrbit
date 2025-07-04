/*
  # Admin Features and Notifications

  1. New Tables
    - `notifications` - System notifications for users
    - `admin_users` - Special admin access control
    
  2. Security
    - Enable RLS on new tables
    - Add policies for admin access
    - Add policies for user notifications
    
  3. Functions
    - Function to check admin status
    - Function to send notifications to all users
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'event', 'system')),
  recipient_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create admin_users table for special admin access
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
  permissions text[] DEFAULT ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send'],
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications 
  FOR SELECT USING (recipient_id = auth.uid() OR recipient_id IS NULL);

CREATE POLICY "Admins can create notifications" ON notifications 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND 'notifications:send' = ANY(permissions)
    )
  );

CREATE POLICY "Users can update their own notifications" ON notifications 
  FOR UPDATE USING (recipient_id = auth.uid());

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON admin_users 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage admin users" ON admin_users 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND role = 'super_admin'
    )
  );

-- Update events policies for admin access
DROP POLICY IF EXISTS "Event organizers can update their events" ON events;
DROP POLICY IF EXISTS "Event organizers can delete their events" ON events;

CREATE POLICY "Event organizers and admins can update events" ON events 
  FOR UPDATE USING (
    auth.uid() = organizer_id OR 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND 'events:edit' = ANY(permissions)
    )
  );

CREATE POLICY "Event organizers and admins can delete events" ON events 
  FOR DELETE USING (
    auth.uid() = organizer_id OR 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND 'events:delete' = ANY(permissions)
    )
  );

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = is_admin.user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send notification to all users
CREATE OR REPLACE FUNCTION send_notification_to_all(
  notification_title text,
  notification_message text,
  notification_type text DEFAULT 'info'
)
RETURNS void AS $$
BEGIN
  -- Check if sender is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can send notifications to all users';
  END IF;

  -- Insert notification for each user
  INSERT INTO notifications (title, message, type, recipient_id, sender_id)
  SELECT 
    notification_title,
    notification_message,
    notification_type,
    p.id,
    auth.uid()
  FROM profiles p;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send notification to specific user
CREATE OR REPLACE FUNCTION send_notification_to_user(
  user_id uuid,
  notification_title text,
  notification_message text,
  notification_type text DEFAULT 'info'
)
RETURNS void AS $$
BEGIN
  -- Check if sender is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can send notifications';
  END IF;

  -- Insert notification
  INSERT INTO notifications (title, message, type, recipient_id, sender_id)
  VALUES (notification_title, notification_message, notification_type, user_id, auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at trigger for notifications
CREATE TRIGGER update_notifications_updated_at 
  BEFORE UPDATE ON notifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (replace with your admin email)
INSERT INTO admin_users (user_id, email, role, permissions)
SELECT 
  p.id,
  'admin@hackorbit.com',
  'super_admin',
  ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage']
FROM profiles p
WHERE p.id IN (
  SELECT id FROM auth.users WHERE email = 'admin@hackorbit.com'
)
ON CONFLICT (user_id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);