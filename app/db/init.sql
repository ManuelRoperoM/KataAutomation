-- Schema
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed: password is 'Test1234!' hashed with bcrypt
INSERT INTO users (email, password_hash, name)
VALUES ('user@test.com', '$2b$10$5Z3Sq33KpuU.JC3gTnuV/uloYkcht8/hFNJPLF8bRqKHvOZEx21T6', 'Test User')
ON CONFLICT (email) DO NOTHING;

-- Seed: some initial todos for the test user
INSERT INTO todos (title, completed, user_id) VALUES
  ('Revisar correos', false, 1),
  ('Preparar presentación', false, 1),
  ('Llamar al médico', true, 1)
ON CONFLICT DO NOTHING;
