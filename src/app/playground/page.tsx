import PlaygroundComposer from '@/components/PlaygroundComposer';

export default function PlaygroundPage() {
  return (
    <main className="dashboard-shell">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Playground</p>
          <h1>Prepare production-shaped payloads before wiring a real client.</h1>
          <p className="lede">
            Adjust the try-on parameters that the IDM-VTON queue endpoint expects and keep the JSON request aligned with the backend proxy.
          </p>
        </div>
      </section>
      <PlaygroundComposer />
    </main>
  );
}
