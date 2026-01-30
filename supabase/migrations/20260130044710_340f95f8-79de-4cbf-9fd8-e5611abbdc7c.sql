-- Add full_name column to admin_users
ALTER TABLE public.admin_users 
ADD COLUMN full_name text;