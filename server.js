const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'baid@admin2024';
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static(__dirname));

// Read config
app.get('/api/config', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Could not read config' });
  }
});

// Save config (admin only)
app.post('/api/config', (req, res) => {
  const { _password, ...data } = req.body;
  if (_password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Could not save config' });
  }
});

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('  Baid Stock — Admin Server Running');
  console.log('========================================');
  console.log(`  Site:         http://localhost:${PORT}`);
  console.log(`  Admin Panel:  http://localhost:${PORT}/admin.html`);
  console.log(`  Password:     ${ADMIN_PASS}`);
  console.log('========================================\n');
});
