import { writeFileSync } from 'fs';

const API_KEY = process.env.HEYGEN_API_KEY;
const BASE = 'https://api.heygen.com';

const SCRIPT = `Here's a problem nobody's talking about yet.

When an AI coding agent writes code for you, it doesn't just type. It reads your files, calls external tools, makes architectural decisions, and rejects alternatives — all before writing a single line. And none of that is visible to your security team.

Let me show you what that actually looks like. This is a real Claude Code session writing one TypeScript function. On the right, you can see Corridor capturing every event in real time — the file reads, the tool calls, the planning phase. Watch what happens around line 22.

There it is. A SQL injection vulnerability. The agent followed a legacy pattern it found in the codebase. The PR would have landed clean. The vulnerability was already in.

This is the governance gap. Security has to move from review-time to plan-time.

Corridor is the independent control plane between every AI agent and every repository. Full trace. Real-time policy. No vendor lock.

You can't govern what you can't observe. Visit corridor.dev to learn more.`;

const HEADERS = {
  'X-Api-Key': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
};

async function get(path) {
  const r = await fetch(`${BASE}${path}`, { headers: HEADERS });
  const json = await r.json();
  return json;
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function main() {
  // Pick avatar
  console.log('Fetching avatars...');
  const avatarsData = await get('/v2/avatars');
  const avatars = avatarsData?.data?.avatars ?? [];
  if (!avatars.length) throw new Error('No avatars: ' + JSON.stringify(avatarsData));
  const avatar = avatars.find(a => /Bryan|Daniel|Daisy|Angela|Tyler|Anna/i.test(a.avatar_name)) ?? avatars[0];
  console.log('Avatar:', avatar.avatar_name, avatar.avatar_id);

  // Pick voice — log all English voices found
  console.log('Fetching voices...');
  const voicesData = await get('/v2/voices');
  const voices = voicesData?.data?.voices ?? [];
  console.log('Total voices:', voices.length);
  const englishVoices = voices.filter(v =>
    v.language?.toLowerCase().includes('en') ||
    v.locale?.toLowerCase().includes('en')
  );
  console.log('English voices found:', englishVoices.length);
  englishVoices.slice(0, 5).forEach(v => console.log(' -', v.name, v.voice_id, v.language, v.gender));

  const voice = englishVoices.find(v => v.gender?.toLowerCase() === 'male')
    ?? englishVoices[0]
    ?? voices[0];

  if (!voice) throw new Error('No voices available');
  console.log('Using voice:', voice.name, voice.voice_id);

  // Generate
  console.log('Submitting to HeyGen...');
  const genData = await post('/v2/video/generate', {
    video_inputs: [{
      character: {
        type: 'avatar',
        avatar_id: avatar.avatar_id,
        avatar_style: 'normal',
      },
      voice: {
        type: 'text',
        input_text: SCRIPT,
        voice_id: voice.voice_id,
        speed: 1.0,
      },
      background: {
        type: 'color',
        value: '#080810',
      },
    }],
    dimension: { width: 854, height: 1280 },
  });

  console.log('Generate response:', JSON.stringify(genData));
  const videoId = genData?.data?.video_id;
  if (!videoId) throw new Error('No video_id: ' + JSON.stringify(genData));
  console.log('Video ID:', videoId);

  // Poll up to 20 minutes
  for (let i = 0; i < 120; i++) {
    await new Promise(r => setTimeout(r, 10000));
    const status = await get(`/v1/video_status.get?video_id=${videoId}`);
    const s = status?.data?.status;
    console.log(`[${i + 1}/120] Status: ${s}`);
    if (s === 'completed') {
      const url = status.data.video_url;
      console.log('Video URL:', url);
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      writeFileSync('out/presenter.mp4', Buffer.from(buf));
      console.log('Saved out/presenter.mp4');
      return;
    }
    if (s === 'failed') throw new Error('HeyGen failed: ' + JSON.stringify(status));
  }
  throw new Error('Timed out');
}

main().catch(e => { console.error(e); process.exit(1); });
