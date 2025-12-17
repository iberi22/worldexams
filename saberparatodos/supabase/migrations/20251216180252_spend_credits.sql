-- RPC: spend_credits
-- Deducts credits from a profile and logs a transaction.
-- Intended to be called by Edge Functions using the service role.

create or replace function public.spend_credits(
  p_user_id uuid,
  p_amount int,
  p_description text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_user_id is null then
    raise exception 'invalid_user';
  end if;

  if p_amount is null or p_amount <= 0 then
    raise exception 'invalid_amount';
  end if;

  update public.profiles
    set credits = credits - p_amount,
        updated_at = now()
  where id = p_user_id
    and credits >= p_amount;

  if not found then
    raise exception 'insufficient_credits';
  end if;

  insert into public.transactions (user_id, amount, type, description, created_at)
  values (p_user_id, p_amount, 'usage', p_description, now());
end;
$$;

revoke all on function public.spend_credits(uuid,int,text) from public;
grant execute on function public.spend_credits(uuid,int,text) to service_role;
