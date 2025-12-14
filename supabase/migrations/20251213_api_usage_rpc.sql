create or replace function increment_api_usage(key_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update api_keys
  set
    quota_used = quota_used + 1,
    last_used_at = now()
  where id = key_id;
end;
$$;
