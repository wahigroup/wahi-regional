-- Add role column to admin_users
ALTER TABLE public.admin_users 
ADD COLUMN role text NOT NULL DEFAULT 'admin';

-- Update existing admin to have 'admin' role
UPDATE public.admin_users SET role = 'admin' WHERE username = 'admin';