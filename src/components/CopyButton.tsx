'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="btn"
      style={{ padding: '0.25rem 0.5rem', marginLeft: '0.5rem', background: 'transparent', border: '1px solid var(--border)' }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} color="var(--text-muted)" />}
    </button>
  );
}
