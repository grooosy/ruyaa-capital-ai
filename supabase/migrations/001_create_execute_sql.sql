-- Creates a helper to run arbitrary SQL and return JSONB
create or replace function execute_sql(sql text)
returns jsonb
language plpgsql
as $$
declare
  result jsonb;
begin
  execute format('select jsonb_agg(t) from (%s) t', sql) into result;
  return coalesce(result, '[]'::jsonb);
end;
$$;
