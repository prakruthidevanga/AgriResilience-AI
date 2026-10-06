# AgriResilience-AI

**Multimodal Generative Visual Climate Simulation and Bio-LLM Genomic Adaptation**

AgriResilience-AI is a research prototype that demonstrates a path from climate conditions to crop-risk estimates and biological research concepts. It uses small, explainable calculations. It is not a validated crop forecast, financial tool, genomic analysis, or gene-editing system.

## Objective

Make a climate scenario easier to understand by showing possible crop stress, field-condition visuals, estimated yield and financial impact, and a conceptual route toward genomic adaptation research.

## Technologies

- Frontend: React, JavaScript, CSS, and Vite
- Backend: Python and Flask
- Database: MongoDB with PyMongo
- Communication: JSON REST API requests using `fetch()`

## Project structure

```text
AgriResilience-AI/
├── frontend/
│   ├── src/
│   │   ├── components/       # Page sections and simulator components
│   │   ├── services/api.js   # fetch() call to Flask
│   │   ├── App.jsx           # Page layout and shared simulation state
│   │   └── index.css         # Global styles and design variables
│   └── package.json
├── backend/
│   ├── app.py                # Flask API and input validation
│   ├── analysis.py           # Simple prototype calculations
│   ├── database.py           # Save one simulation in MongoDB
│   ├── requirements.txt
│   └── .env.example
├── README.md
└── VIVA_GUIDE.md
```

## Requirements

- Node.js and npm
- Python 3.10 or later
- MongoDB Community Server running locally, or a MongoDB connection URI

## Install and run

Open two terminals from the project root.

### 1. Start MongoDB

Start your local MongoDB service. The default connection is `mongodb://localhost:27017`. The database and `simulations` collection are created when the first result is saved.

### 2. Start Flask

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

Flask listens on `http://localhost:5000`. If PowerShell blocks virtual-environment activation, run `.venv\Scripts\python.exe -m pip install -r requirements.txt`, then `.venv\Scripts\python.exe app.py`.

### 3. Start React

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The frontend uses `http://localhost:5000` by default. To use another API address, set `VITE_API_URL` in `frontend/.env`, for example `VITE_API_URL=http://localhost:5000`.

## API explanation

`POST /api/simulate` accepts JSON like:

```json
{
  "crop": "Rice",
  "temperature": 35,
  "droughtDays": 10,
  "salinity": 0,
  "simulationPeriod": 30
}
```

Flask checks the allowed crop and value ranges. It calls `analyze_scenario()` in `backend/analysis.py`, adds a timestamp, saves the result, and returns the result as JSON. Invalid input returns HTTP 400. If MongoDB cannot save the result, the API returns HTTP 503 instead of suggesting that it was stored. `GET /api/health` is a small server health check.

## Calculation explanation

The functions in `backend/analysis.py` intentionally use short, illustrative rules:

- Heat stress increases above 30°C.
- Drought stress is the selected drought duration as a fraction of 60 days.
- Salinity stress is the selected salinity as a fraction of 50%.
- Crop health starts at 100, subtracts heat above 35°C, drought duration, and salinity, then stays in the 0–100 range.
- Risk is a weighted combination: 30% heat, 40% drought, and 30% salinity.
- Yield loss is a simple fraction of lost crop health.
- Financial loss applies that yield-loss percentage to a fixed example value of $2,200 per acre.

These rules demonstrate the data flow only. They do not model particular crop varieties, locations, soils, or real farm economics.

## MongoDB setup

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` if your MongoDB address is not the default. `MONGODB_DATABASE` selects the database name. The prototype writes each input and result to one `simulations` collection. It does not use accounts, relationships, or other collections.

## Current limitations and future work

Current behavior is a rule-based prototype. Field images are illustrative reference visuals, candidate genes and gRNA are demonstration data, and the app does not run SAM, ControlNet, Stable Diffusion, OpenCV, an LLM/RAG system, ESM-2, or DNABERT. It does not perform or validate CRISPR editing. Future work could connect suitable models and trusted datasets, then validate results with agricultural and biological experts before making practical claims.

See [VIVA_GUIDE.md](VIVA_GUIDE.md) for short explanations of the project and its technologies.