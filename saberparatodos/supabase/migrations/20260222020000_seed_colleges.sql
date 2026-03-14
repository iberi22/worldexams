-- World Exams - Seed colleges data
-- This is a sample - full data would be too large for SQL

INSERT INTO public.colleges (cod_dane, name, department, municipality, sector, character, calendar, address, phone, email, principal)
VALUES 
('001', 'Test College 1', 'ANTIOQUIA', 'MEDELLIN', 'OFICIAL', 'ACADEMICO', 'A', 'Calle 1', '1234567', 'test1@colegio.edu.co', 'Rector 1'),
('002', 'Test College 2', 'CUNDINAMARCA', 'BOGOTA', 'PRIVADO', 'ACADEMICO', 'A', 'Calle 2', '1234568', 'test2@colegio.edu.co', 'Rector 2')
ON CONFLICT (cod_dane) DO NOTHING;
