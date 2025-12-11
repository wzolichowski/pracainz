# AI VISION

Aplikacja webowa do analizy obrazów z wykorzystaniem **Azure Computer Vision** oraz generowania nowych obrazów za pomocą **Azure OpenAI (DALL-E 3)**.

##  Spis treści

- Funkcjonalności
- Architektura
- Technologie
- Konfiguracja
- Struktura projektu

---

##  Funkcjonalności

### Analiza Obrazów
-  **Upload obrazów** (JPG, PNG) poprzez przeciągnięcie lub wybór pliku
-  **Analiza zawartości** obrazu za pomocą Azure Computer Vision
-  **Automatyczne tagowanie** - rozpoznawanie obiektów, scen i konceptów
-  **Generowanie opisów** - automatyczne tworzenie tekstowych opisów obrazów
-  **Historia analiz** - zapisywanie i przeglądanie wcześniejszych analiz w Firestore

### Generowanie Obrazów (DALL-E 3)
-  **Generowanie obrazów** na podstawie tagów z analizy
-  **Edycja promptów** przed generowaniem
-  **Konfiguracja parametrów**:
  - Rozmiar (1024x1024, 1792x1024, 1024x1792)
  - Jakość (standard, HD)
  - Styl (vivid, natural)
-  **Pobieranie wygenerowanych obrazów**
-  **Historia generacji** zapisywana w Firestore

### Autentykacja & Bezpieczeństwo
-  **Firebase Authentication** (email/hasło + Google OAuth)
-  **Token-based authentication** dla API
-  **Zarządzanie sesją użytkownika**
-  **Firestore Security Rules** dla danych użytkownika

### Progressive Web App (PWA)
-  **Instalowalne** na urządzeniach mobilnych i desktopowych
-  **Szybkie ładowanie** dzięki Service Worker
-  **Działanie offline** (caching statycznych zasobów)
-  **Web App Manifest** z ikoną i konfiguracją

---

##  Architektura

```
┌─────────────────┐
│   Frontend PWA  │
│   (HTML/CSS/JS) │
└────────┬────────┘
         │ HTTPS
         ↓
┌─────────────────────────┐
│  Azure Static Web Apps  │
│  (Hosting + Routing)    │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌─────────┐ ┌──────────────┐
│ Firebase│ │ Azure Fns    │
│  Auth   │ │ (Python 3.9) │
│Firestore│ └──────┬───────┘
└─────────┘        │
                   ↓
           ┌───────────────┐
           │ Azure Services│
           ├───────────────┤
           │ Computer      │
           │ Vision        │
           ├───────────────┤
           │ Azure OpenAI  │
           │ (DALL-E 3)    │
           └───────────────┘
```

### Przepływ danych

1. **Użytkownik loguje się** → Firebase Auth zwraca ID token
2. **Upload obrazu** → Frontend wysyła plik + token do `/api/AnalyzeImage`
3. **Azure Function** weryfikuje token i analizuje obraz 
4. **Wyniki** są zapisywane w Firestore i wyświetlane użytkownikowi
5. **Generowanie obrazu** → Frontend wysyła prompt + token do `/api/GenerateImage`
6. **DALL-E 3** generuje obraz, URL zwracany do frontendu

---

##  Technologie

### Frontend
- **HTML5** + **CSS3** 
- **Vanilla JavaScript** 
- **Firebase** 
- **Service Worker** 

### Backend
- **Python 3.9**
- **Azure Functions** (serverless)
- **Azure Computer Vision API** (image analysis)
- **Azure OpenAI** (DALL-E 3 image generation)
- **Firebase REST API** (token verification)

### Infrastructure
- **Azure Static Web Apps** (hosting + CI/CD)
- **Azure Functions** (serverless backend)
- **Firebase** (authentication + database)
- **GitHub Actions** (automated deployment)

### Konta i klucze API
- **Azure Subscription** (z dostępem do Computer Vision + Azure OpenAI)
- **Firebase Project** (z włączonym Auth + Firestore)
- **GitHub Account** (dla CI/CD)
 
---

## Struktura projektu

```
praca_inzynierska/
├── index.html              # Główna strona PWA
├── script.js               # Logika analizy obrazów
├── auth.js                 # Autoryzacja Firebase
├── history.js              # Historia analiz
├── image-generator.js      # Generowanie obrazów DALL-E
├── utils.js                # Wspólne funkcje
├── tooltip-mobile.js       # Obsługa tooltipów mobilnych
├── styles.css              # Style główne
├── dalle-styles.css        # Style dla DALL-E
├── firebase-config.template.js  # Szablon konfiguracji Firebase
|
│
├── manifest/               # PWA manifest i Service Worker
│   ├── manifest.json
│   ├── service-worker.js
│   └── assets/
│       └── favicon.svg
│
├── api/                    # Azure Functions (Python)
│   ├── requirements.txt
│   ├── host.json
│   ├── shared/             
│   │   ├── __init__.py
│   │   └── auth.py         
│   ├── AnalyzeImage/
│   │   ├── __init__.py
│   │   └── function.json
│   |── GenerateImage/
│      ├── __init__.py
│      └── function.json
│   
│
└── .github/
    └── workflows/
        └── azure-static-web-apps.yml  # CI/CD pipeline
```
---

## 📄 Licencja

Projekt edukacyjny - praca inżynierska.


