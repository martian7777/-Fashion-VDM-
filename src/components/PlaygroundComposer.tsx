'use client';

import { useMemo, useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';

export default function PlaygroundComposer() {
  const [garment, setGarment] = useState('Short sleeve round neck t-shirt');
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState(42);
  const [autoMask, setAutoMask] = useState(true);
  const [autoCrop, setAutoCrop] = useState(false);

  const payload = useMemo(() => JSON.stringify({
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

  async function copyPayload() {
    await navigator.clipboard.writeText(payload);
  }

  return (
    <section className="playground-grid">
      <div className="panel stack">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Request Builder</p>
            <h2>Try-on payload</h2>
          </div>
        </div>
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
          <button type="button" className="btn btn-primary">
            <Wand2 size={18} />
            Ready to call API
          </button>
        </div>
      </div>
    </section>
  );
}
