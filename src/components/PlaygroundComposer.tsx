'use client';

import { useMemo, useState } from 'react';
import { Copy, Play, Wand2 } from 'lucide-react';

export default function PlaygroundComposer() {
  const [apiKey, setApiKey] = useState('');
  const [garment, setGarment] = useState('Short sleeve round neck t-shirt');
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState(42);
  const [autoMask, setAutoMask] = useState(true);
  const [autoCrop, setAutoCrop] = useState(false);
  const [requestBody, setRequestBody] = useState('');
  const [responseText, setResponseText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const generatedPayload = useMemo(() => JSON.stringify({
    data: [
      { background: 'human-image-payload', layers: [], composite: null },
      'garment-image-payload',
      garment,
      autoMask,
      autoCrop,
      steps,
      seed,
    ],
  }, null, 2), [autoCrop, autoMask, garment, seed, steps]);

  const payload = requestBody || generatedPayload;

  async function copyPayload() {
    await navigator.clipboard.writeText(payload);
  }

  async function runRequest() {
    setStatus('loading');
    setResponseText('');

    try {
      const parsedBody = JSON.parse(payload);
      const response = await fetch('/api/v1/generate-tryon', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedBody),
      });

      const text = await response.text();
      setResponseText(text);
      setStatus(response.ok ? 'success' : 'error');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed';
      setResponseText(message);
      setStatus('error');
    }
  }

  return (
    <section className="playground-grid">
      <div className="panel stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Request Builder</p>
            <h2>Live API request</h2>
          </div>
        </div>
        <label className="field">
          <span>API key</span>
          <input className="input" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="fvdm_..." />
        </label>
        <label className="field">
          <span>Garment description</span>
          <input className="input" value={garment} onChange={(event) => setGarment(event.target.value)} />
        </label>
        <label className="field">
          <span>Denoise steps</span>
          <input className="range" type="range" min={20} max={40} value={steps} onChange={(event) => setSteps(Number(event.target.value))} />
          <strong>{steps}</strong>
        </label>
        <label className="field">
          <span>Seed</span>
          <input className="input" type="number" value={seed} onChange={(event) => setSeed(Number(event.target.value))} />
        </label>
        <div className="toggle-row">
          <label><input type="checkbox" checked={autoMask} onChange={(event) => setAutoMask(event.target.checked)} /> Auto mask</label>
          <label><input type="checkbox" checked={autoCrop} onChange={(event) => setAutoCrop(event.target.checked)} /> Auto crop</label>
        </div>
        <label className="field">
          <span>Editable JSON body</span>
          <textarea
            className="textarea"
            value={payload}
            onChange={(event) => setRequestBody(event.target.value)}
          />
        </label>
      </div>

      <div className="panel stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Preview</p>
            <h2>JSON body</h2>
          </div>
        </div>
        <pre className="code-block tall-code"><code>{payload}</code></pre>
        <div className="button-row">
          <button type="button" className="btn btn-secondary" onClick={copyPayload}>
            <Copy size={18} />
            Copy JSON
          </button>
          <button type="button" className="btn btn-primary" onClick={runRequest} disabled={status === 'loading' || !apiKey.trim()}>
            {status === 'loading' ? <Wand2 size={18} /> : <Play size={18} />}
            {status === 'loading' ? 'Submitting...' : 'Call API'}
          </button>
        </div>
        <div className={`response-panel response-${status}`}>
          <span>Response</span>
          <pre><code>{responseText || 'Run a request to inspect the gateway response.'}</code></pre>
        </div>
      </div>
    </section>
  );
}
