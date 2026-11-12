ALTER TABLE public.households ADD COLUMN shopper_id uuid;
CREATE FUNCTION public.set_shopper(_user uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF public.my_household() IS NULL THEN RAISE EXCEPTION 'No home'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.household_members WHERE user_id=_user AND household_id=public.my_household()) THEN RAISE EXCEPTION 'Not a housemate'; END IF;
  UPDATE public.households SET shopper_id=_user WHERE id=public.my_household();
END $$;
REVOKE ALL ON FUNCTION public.set_shopper(uuid) FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.set_shopper(uuid) TO authenticated;