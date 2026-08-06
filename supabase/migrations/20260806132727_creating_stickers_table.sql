CREATE TABLE sticks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    description TEXT,
    positionX INTEGER,
    positionY INTEGER,
    sizeWidth INTEGER,
    sizeHeight INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner uuid REFERENCES users(id)
);