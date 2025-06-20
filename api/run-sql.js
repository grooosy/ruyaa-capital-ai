import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  if (req.headers['x-secret'] !== process.env.DB_ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const { sql } = req.body || {}
  if (!sql) {
    res.status(400).json({ error: 'Missing sql' })
    return
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabase.rpc('execute_sql', { sql })
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.status(200).json({ data })
}
