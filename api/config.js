const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const ADMIN_PASS   = process.env.ADMIN_PASSWORD || 'baid@admin2024';

const sbHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/site_config?id=eq.1&select=data`, {
        headers: sbHeaders()
      });
      const text = await r.text();
      const rows = JSON.parse(text);
      const data = rows[0]?.data || {};
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(200).send(JSON.stringify(data));
    } catch (e) {
      return res.status(500).json({ error: 'Could not fetch config' });
    }
  }

  if (req.method === 'POST') {
    const { _password, ...data } = req.body;
    if (_password !== ADMIN_PASS) {
      return res.status(401).json({ error: 'Wrong password' });
    }
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/site_config?id=eq.1`, {
        method: 'PATCH',
        headers: { ...sbHeaders(), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ data }),
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Could not save config' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
