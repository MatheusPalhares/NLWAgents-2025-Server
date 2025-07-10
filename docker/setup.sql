-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Database is ready for connections
SELECT 'Database initialized successfully' as status;