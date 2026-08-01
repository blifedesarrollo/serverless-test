-- Usuario y base de datos para prueba técnica
CREATE USER blife_test WITH PASSWORD 'test_passwrd';
CREATE DATABASE productos_blife OWNER blife_test;
GRANT ALL PRIVILEGES ON DATABASE productos_blife TO blife_test;

-- Permisos para usuario 
\c productos_blife
GRANT ALL ON SCHEMA public TO blife_test;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO blife_test;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO blife_test;