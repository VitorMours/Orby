CREATE TABLE public.todo (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT, 
    conclusionStatus BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT  NOW(),
    archivedAt TIMESTAMP DEFAULT NULL,
    owner uuid REFERENCES auth.users(id) ON DELETE CASCADE
);