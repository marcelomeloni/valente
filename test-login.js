// Script de teste local independente para debug de auth plain texts
fetch('http://localhost:3001/api/auth/login/admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin' })
})
.then(async r => {
  const status = r.status;
  const json = await r.json();
  console.log(`[STATUS]: ${status}`);
  console.log(`[RESPONSE]:`, json);
})
.catch(err => console.error(err));
