-- Update RLS policy to allow bulk inserts
DROP POLICY IF EXISTS "Allow public read colleges" ON public.colleges;
CREATE POLICY "Allow public read colleges" ON public.colleges FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert colleges" ON public.colleges FOR INSERT TO public WITH CHECK (true);
