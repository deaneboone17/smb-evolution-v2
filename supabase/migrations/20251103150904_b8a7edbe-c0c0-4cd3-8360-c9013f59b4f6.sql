
-- Create admin user: deane.boone@smbevolution.ai
-- Using Supabase Auth admin API equivalent

-- Insert directly into auth.users (requires service role)
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Generate user id
  new_user_id := gen_random_uuid();
  
  -- Insert user into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'deane.boone@smbevolution.ai',
    crypt('Orange26!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    'authenticated',
    'authenticated'
  );
  
  -- Add user to user_roles as admin
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_user_id, 'admin');
  
END $$;
