-- db/init.sql

-- Connect to the database and create table (optional)
\connect bookstoredb

CREATE TABLE IF NOT EXISTS public.books (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  reviews TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  username  TEXT NOT NULL,
  password TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  

INSERT INTO public.books (author, title, reviews) 
VALUES 
  ('John Doe', 'john@example.com', 'Great book!'),
  ('Jane Smith', 'jane@example.com', 'Interesting read.'),
  ('Chinua Achebe', 'Things Fall Apart', 'A classic novel about the impact of colonialism in Africa.'),
  ('Margaret Atwood', 'The Handmaids Tale', 'A dystopian novel exploring themes of female oppression and resistance.'),
  ('Hans Christian Andersen', 'Fairy tales', 'A collection of classic fairy tales including "The Little Mermaid" and "The Ugly Duckling".'),
  ('Aristophanes', 'Lysistrata', 'A comedic play about women withholding sex from their husbands to end a war.'),
  ('Dante Alighieri', 'The Divine Comedy', 'A spiritual journey through the afterlife.'),
  ('Tran Hien', 'The Epic Of Gilgamesh', 'One of the earliest great works of literature.'),
  ('Tran Hoai', 'The Book Of Job', 'A profound biblical story exploring suffering and faith.'),
  ('Tran Dat', 'One Thousand and One Nights', 'A rich collection of Middle Eastern and South Asian folk tales.'),
  ('Tran Phuc', 'Ns Saga', 'A saga that captures the essence of Norse mythology.'),
  ('Jane Austen', 'Pride and Prejudice', 'A timeless romance exploring issues of class, marriage, and morality.'),
  ('Honoré de Balzac', 'Le Père Goriot', 'A powerful portrayal of father-daughter relationships and Parisian society.'),
  ('Samuel Beckett', 'Molloy, Malone Dies, The Unnamable, the trilogy', 'A surreal and existential journey told through three interconnected novels.'),
  ('Giovanni Boccaccio', 'The Decameron', 'A masterpiece of early Italian prose that captures the human spirit during the plague.'),
  ('Jorge Luis Borges', 'Ficciones, Labyrinths', 'A dazzling blend of metaphysical fiction and fantasy.'),
  ('Emily Brontë', 'Wuthering Heights', 'A haunting tale of passion and revenge on the Yorkshire moors.'),
  ('Albert Camus', 'The Stranger, The Myth of Sisyphus, The Plague, The Fall, Exile and the Kingdom, A Happy Death, The Rebel', 'A philosophical novel examining the absurdity of life.'),
  ('Miguel de Cervantes', 'Don Quixote', 'An iconic Spanish novel of chivalry, imagination, and madness.'),
  ('Geoffrey Chaucer', 'The Canterbury Tales', 'A vivid portrait of medieval life and a landmark in English literature.'),
  ('Anton Chekhov', 'Short Stories', 'Tell me a story.');