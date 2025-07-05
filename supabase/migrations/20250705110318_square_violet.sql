/*
  # Setup Admin Access for Special Email

  1. Insert admin user for naitiksharma691@gmail.com
  2. Create function to automatically grant admin access
  3. Update admin policies
*/

-- Function to grant admin access to specific email
CREATE OR REPLACE FUNCTION grant_admin_access()
RETURNS trigger AS $$
BEGIN
  -- Check if the new user has the special admin email
  IF NEW.email = 'naitiksharma691@gmail.com' THEN
    -- Insert admin record
    INSERT INTO admin_users (user_id, email, role, permissions)
    VALUES (
      NEW.id,
      NEW.email,
      'super_admin',
      ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage']
    )
    ON CONFLICT (user_id) DO UPDATE SET
      role = 'super_admin',
      permissions = ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage'];
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically grant admin access
CREATE OR REPLACE TRIGGER auto_grant_admin_access
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION grant_admin_access();

-- Also grant admin access if the user already exists
DO $$
BEGIN
  INSERT INTO admin_users (user_id, email, role, permissions)
  SELECT 
    au.id,
    au.email,
    'super_admin',
    ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage']
  FROM auth.users au
  WHERE au.email = 'naitiksharma691@gmail.com'
  ON CONFLICT (user_id) DO UPDATE SET
    role = 'super_admin',
    permissions = ARRAY['events:create', 'events:edit', 'events:delete', 'notifications:send', 'users:manage'];
END $$;