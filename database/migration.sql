CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('employer', 'employee')) NOT NULL,
    hashedpassword TEXT NOT NULL
);
