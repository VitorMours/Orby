CREATE TABLE public.notes(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT, 
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT  NOW(),
    owner uuid REFERENCES auth.users(id) ON DELETE CASCADE
);