# HealthBridge Web

Accessible healthcare web app for medicine tracking, symptom checking, and smart referrals.

## Key Features

###Medicine Tracker with Smart Scanner
- Add medicines by scanning barcodes or recognizing printed names via Barcode.
- Log each dose simply by rescanning — no typing or reminder setup needed.

### Family Link System
- Invite family or caregivers to view real-time medicine intake logs.
- See last taken time, missed doses, and overall adherence pattern.

### AI-Powered Symptom Checker
- Voice-based symptom intake using local languages.
- Understands simple phrases and guides the user through a health check.

###  Smart Clinic & Telehealth Referrals
- Based on symptoms and GPS location, suggests:
  - Nearby clinics/hospitals
  - Public transport directions to reach care

---

## 🔧 Tech Stack

| Feature | Technology |
|--------|-------------|
| Web App | React Native (Expo) or Flutter |
| OCR / Barcode | Google ML Kit / Expo Camera |
| Voice I/O | Google Cloud Speech / Expo Speech |
| Backend | Firebase Auth + Realtime DB |
| Maps | Google Maps API / Mapbox |
| NLP | OpenAI / Dialogflow / LangChain |
| Multilingual Support | i18n.js or Flutter Intl |

---

## Architecture Highlights
- Modular: Medicine Tracker & Symptom Checker can work standalone.
- Optimized for low-end devices and poor connectivity environments.

---

##  Impact
HealthBridge aims to bridge the digital healthcare gap by making vital tools intuitive and accessible — especially for the elderly, rural populations, and those with disabilities or low literacy levels.

---

##  Future Enhancements
- SOS alert feature for critical symptoms
- Offline support with delayed cloud sync
- Prescription photo parsing using AI
- Integrated vitals logging (e.g., BP, sugar)

---
