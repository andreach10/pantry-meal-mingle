CREATE TABLE public.hidden_staples (household_id uuid NOT NULL REFERENCES public.households(id) ON DELETE CASCADE DEFAULT public.my_household(), name text NOT NULL, PRIMARY KEY (household_id, name));
GRANT SELECT, INSERT, DELETE ON public.hidden_staples TO authenticated;
GRANT ALL ON public.hidden_staples TO service_role;
ALTER TABLE public.hidden_staples ENABLE ROW LEVEL SECURITY;
CREATE POLICY hidden_access ON public.hidden_staples FOR ALL TO authenticated USING (household_id = public.my_household()) WITH CHECK (household_id = public.my_household());