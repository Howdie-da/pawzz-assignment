# Pawzz — Practo for Animals
### Product & Technology Intern Assignment Submission

---

## 1. Product Concept

**Who uses Pawzz?**
Pet parents in Tier 1/2 Indian cities are the primary users — people who own dogs, cats, birds or exotic pets and need quick, reliable access to animal care. Secondary users are animal rescuers, NGO volunteers, and foster caregivers who need to connect stray animals to services fast. Tertiary users are the providers themselves: vets, clinics, NGOs, boarding facilities, and ambulances who want to be discoverable.

**The problem we solve first:**
Discovery is broken. A pet parent in Bangalore with a sick dog at 2 AM has no single trusted source — they scroll Google Maps, DM Instagram accounts, ask WhatsApp groups and hope for the best. Information is fragmented, unverified, and stressful to navigate in an emergency. **Pawzz solves the discovery problem first**: one place to find every animal-care service near you, verified, with real information.

**5 prioritised features:**
1. **Location-Based Service Search** — Find vets, clinics, NGOs, ambulances, and boarding near you with smart filters (open now, species, emergency care)
2. **Verified Provider Profiles** — Standardised profiles with ratings, timings, services, fees, and contact details
3. **AI Medical Record Reader** — Upload any prescription or lab report; AI extracts diagnosis, medications, red flags in plain language
4. **Emergency SOS** — One-tap to find and contact the nearest available emergency vet or ambulance
5. **Pet Health Passport** — Digital per-pet profile storing vaccination history, medical records, and vet visit timeline

---

## 2. User Flow & Prototype

The prototype is a React + Vite web application with 4 fully interactive screens:

**Screen 1 — Home/Discovery:** Hero search bar with auto-detected location, six category quick-chips (Vet, Emergency, NGO, Ambulance, Boarding, Exotic Care), featured listings for open providers nearby, and a pulsing SOS emergency button.

**Screen 2 — Search Results:** Split layout with a sidebar filter panel (category, species, sort order, open-now toggle) and a results grid. Toggles to a simulated map view with pin markers and a strip list.

**Screen 3 — Provider Profile:** Full provider detail with tabbed sections (About, Services, Reviews, Medical Records), vitals stats bar, booking appointment modal, call and directions buttons, and a mini-map. The Records tab links directly to the AI Reader.

**Screen 4 — AI Medical Record Reader:** Three-stage interactive flow: (1) drag-and-drop upload zone, (2) animated step-by-step processing animation showing exactly what the AI is doing, (3) structured result showing pet info, vitals, diagnosis with severity scores, medication table, red-flag alerts, and follow-up actions. Try the demo without uploading a file.

**User flow:** Home → search or tap category → Results → tap provider → Profile → upload records → AI Reader → save to Pet Passport. SOS button is available on all screens.

---

## 3. AI & Automation

**Workflow 1 — Medical Record Interpreter (Core)**
Upload any pet prescription, discharge summary, or lab report (PDF/image). AI uses multimodal vision to OCR and extract: diagnosis with severity scoring, full medication list with doses and schedule, vitals, red-flag warnings, and follow-up dates. Output populates the Pet Health Passport automatically. *This is the most differentiated AI feature — it directly replaces the cognitive burden on anxious pet parents who can't interpret vet jargon.*

**Workflow 2 — Smart Natural Language Search**
Instead of filters, a pet parent types "emergency vet for rabbit, south Bangalore, open now." AI extracts intent (species, urgency, location, availability), maps it to provider attributes, and returns a ranked, explained result list. Replaces frustrating manual filter-clicking with a conversational interface.

**Workflow 3 — Symptom Pre-Triage Chatbot** *(designed, not built in MVP)*
User describes symptoms in natural language. AI maps to urgency level (emergency / soon / monitor) with species-specific logic (e.g. a dog not eating for 1 day vs. a bird not eating for 6 hours have very different urgency levels). Output: "Take to ER now" vs "Book appointment in 2 days" plus the nearest suitable provider. *The species-aware urgency scoring is our own novel concept.*

**Workflow 4 — Provider Auto-Onboarding via Scraping** *(designed, not built in MVP)*
AI scrapes public WhatsApp groups, Instagram bios, and Google Maps listings to pre-populate provider directory drafts. Bootstraps the supply side without manual cold outreach — critical for getting to useful density fast.

---

## 4. Technology

**Stack:**
- **Frontend:** React + Vite (this prototype), mobile-responsive vanilla CSS
- **Backend (MVP):** Node.js + Express REST API
- **Database:** PostgreSQL + PostGIS extension for location queries (`ST_Distance`, `ST_DWithin`)
- **AI/LLM:** Google Gemini 1.5 Flash (multimodal — reads PDFs + images; fast, low cost)
- **Maps:** Google Maps JS API + Places Autocomplete
- **Auth:** Firebase Auth (Google sign-in + OTP)
- **Storage:** Firebase Storage (medical record PDFs/images)
- **Hosting:** Vercel (frontend) + Railway (backend)

**5 Key API integrations:**
1. **Google Maps Platform** — geocoding, distance matrix, place search, autocomplete
2. **Google Gemini API** — medical record parsing, symptom triage, NLP search intent
3. **Twilio / MSG91** — OTP verification, SMS booking confirmations, emergency alerts
4. **Firebase** — authentication + file storage for medical records
5. **Google Places API** — seed provider directory with existing clinic listings

**Architecture:** React frontend → Express REST API → PostGIS for location queries + Firebase Storage for files → Gemini API for all AI features. Provider search is a spatial query ranked by distance + rating + open status. AI calls are async with a job-queue pattern so the user sees real-time step progress.

---

## 5. MVP Thinking — 30-Day Build

**Build first:**
- Week 1: Provider database schema + seed data (50 Bangalore vets/NGOs sourced from Google Maps + manual verification)
- Week 2: Location search UI + filter + provider profile pages (fully functional, no auth needed)
- Week 3: AI medical record reader with Gemini API integration + basic Pet Passport
- Week 4: Emergency SOS flow + usability testing with 5 pet parents in Bangalore

**Deliberately left out:**
- Payments / booking system (phone call CTA instead — removes friction and compliance overhead)
- Provider self-onboarding portal (manual entry for MVP; faster to launch)
- Mobile app (web-first, fully mobile-responsive)
- Multi-city (Bangalore only, prove the model before scaling)
- Reviews system (static seed reviews for prototype; live UGC needs moderation)
- Symptom triage chatbot (designed and documented, not coded in 30 days)

**Why this order:** The discovery problem (finding services) has more daily usage than any other feature. Get that working first, verify people use it, then add AI layers. The medical record reader is the most differentiated feature — it's the one thing no existing platform does — so it comes second.

---

*Tools used: React, Vite, Vanilla CSS, Google Gemini (AI design), Antigravity IDE*
*Prototype: run `npm run dev` in the project directory → http://localhost:5173*
