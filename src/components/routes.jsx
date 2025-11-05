export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.moolre.com/open/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-VASKEY': import.meta.env.VITE_API_KEYS,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}