# Fashion-VDM API SaaS Platform

This is a full-stack Next.js application that provides an API-as-a-Service gateway for Virtual Try-On models (like IDM-VTON or Fashion-VDM).

It includes a developer dashboard for generating API keys, a SQLite database for secure credential storage, and an API route that proxies authenticated requests to an upstream Hugging Face Inference Endpoint.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Developer Dashboard. You can generate a new API key here.

## Configuration

Before making API calls, rename or create a `.env` file in the root directory and add your upstream model configuration:

```env
# The token for the upstream provider (Hugging Face or Replicate)
HUGGING_FACE_TOKEN="hf_your_token_here"

# The endpoint of your Dedicated Inference Endpoint or Third-Party API
HF_ENDPOINT_URL="https://api-inference.huggingface.co/models/Fashion-VDM" 
```

## How to use the API

You can call your proxy API endpoint using the key generated in your dashboard:

```bash
curl -X POST http://localhost:3000/api/v1/generate-tryon \
  -H "Authorization: Bearer <YOUR_GENERATED_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/garment.jpg",
    "video_url": "https://example.com/person.mp4"
  }'
```

---

## Future Enhancements & Roadmap

This project is currently an MVP. To evolve it into a fully production-ready SaaS, the following enhancements should be implemented:

1. **Stripe Billing Integration:**
   - Integrate Stripe Metered Billing to charge users per generation.
   - Add a billing portal to the dashboard for users to add their credit cards and view invoices.

2. **Upstream Provider Selection:**
   - Switch from the free Hugging Face Serverless API to a **Dedicated Hugging Face Inference Endpoint** (since VTON models are too large for the free tier).
   - Alternatively, integrate with Replicate or Fal.ai APIs for stable, pay-per-second generation.

3. **Secure API Key Hashing:**
   - Currently, API keys are stored in plain text for easy viewing in the MVP. In production, keys should be hashed (e.g., using bcrypt or SHA-256) before storing in the database. 
   - Users should only be able to see the key *once* upon generation.

4. **Production Database:**
   - Migrate from the local SQLite `dev.db` to a robust production database like PostgreSQL (using Supabase, Neon, or Vercel Postgres).

5. **User Authentication:**
   - Add a full user authentication system (e.g., NextAuth.js, Clerk, or Supabase Auth) so multiple users can sign up, log in, and manage their own separate keys and billing securely.
