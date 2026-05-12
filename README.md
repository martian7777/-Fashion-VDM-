# IDM-VTON API Dashboard

This is a full-stack Next.js application that provides an API-as-a-Service gateway for the Hugging Face `yisol/IDM-VTON` Space.

It includes a developer dashboard for generating and deleting API keys, a SQLite database for request tracking, and an authenticated API route that enforces the free request quota before proxying requests to IDM-VTON.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` with your browser to see the dashboard.

## Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
HUGGING_FACE_TOKEN="hf_your_token_here"
IDM_VTON_SPACE_URL="https://yisol-idm-vton.hf.space"
```

`HUGGING_FACE_TOKEN` is optional for a public Space, but useful when authenticated Hugging Face access is preferred. `IDM_VTON_SPACE_URL` is also optional because the app defaults to the public IDM-VTON Space host.

## Current Product Rules

- Free API keys are created with a `10` request quota.
- The proxy route returns `429` once a free key is exhausted.
- The dashboard presents `30+` request workloads as paid-tier territory.
- Billing itself is not implemented yet; the current schema leaves room for attaching it to each key's `plan` and `quota`.

## API Example

```bash
curl -X POST http://localhost:3000/api/v1/generate-tryon \
  -H "Authorization: Bearer <YOUR_GENERATED_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      { "background": "human-image-payload", "layers": [], "composite": null },
      "garment-image-payload",
      "Short sleeve round neck t-shirt",
      true,
      false,
      30,
      42
    ]
  }'
```
