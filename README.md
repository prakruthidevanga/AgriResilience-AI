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
│   │   │   └── SimulationHistory.jsx # Recent saved simulation records
│   │   │   └── FieldImageUpload.jsx # Client-side image selection and preview
│   │   ├── services/api.js   # fetch() calls to Flask
│   │   ├── App.jsx           # Page layout and shared simulation state
│   │   └── index.css         # Global styles and design variables
│   ├── .env.example         # Public frontend API URL only
│   └── package.json
├── backend/
│   ├── app.py                # Flask API and input validation
│   ├── analysis.py           # Simple prototype calculations
│   ├── database.py           # Save and retrieve simulation records
│   ├── tests/
│   │   └── test_analysis.py  # Calculation, validation, and API tests
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

Start your local MongoDB service. The default connection is `mongodb://localhost:27017`. The database and `simulations` collection are created when the first result is saved or the history index is requested.

### 2. Start Flask

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -m ml.train_crop_model
python app.py
```

Flask listens on `http://localhost:5000`. `APP_ENV=development` enables only the local Vite origins by default; debug mode remains off unless `FLASK_DEBUG=true` is explicitly set. If PowerShell blocks virtual-environment activation, run `.venv\Scripts\python.exe -m pip install -r requirements.txt`, then `.venv\Scripts\python.exe app.py`.

### 3. Start React

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The frontend uses `http://localhost:5000` by default. Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL` to the Flask API origin when it differs. This is a public frontend setting; never put MongoDB credentials or backend secrets in a `VITE_` variable.

## Application workspaces

The responsive application shell uses browser hash navigation and the existing components; it does not add a routing or icon dependency. Available workspaces are Overview, Visual Simulation, Financial Risk Analysis, Genomic Analysis, CRISPR Guide Design, Simulation History, Crop Suitability AI, and Settings.

### Visual Simulation (Phase 1 Local Image Processing)

The Visual Simulation workspace accepts an uploaded crop field image (PNG/BMP) and climate parameters. The backend (POST /api/visual-simulate) validates the image, performs Excess Green Index (ExG) vegetation segmentation, computes the measured canopy ratio, and applies a deterministic chlorosis and soil desiccation transform proportional to the temperature, drought duration, and salinity. The result is returned and displayed side-by-side with the uploaded photo. It is an image-derived visual simulation, not a generative AI (Stable Diffusion/ControlNet) model.

Overview cards and its recent table use the latest saved records returned by `GET /api/history` (up to 100). The Flask health check verifies only that the API responds; the interface explicitly does not claim an independent MongoDB health check. A history error is displayed rather than replaced with sample records.

Field image analysis supports browsing or dropping a JPG/JPEG/PNG/WebP file, within the existing 10 MB limit. It previews the image in the browser only. Genomic and CRISPR workspaces explain unavailable integrations and do not generate biological results or sequences. Settings provides configuration and privacy guidance only; there is no login or user profile.

## Crop Suitability AI (trained classifier)

The Crop Suitability AI workspace is a distinct, trained machine-learning feature. It uses a scikit-learn `RandomForestClassifier` trained on the Figshare [Crop Recommendation dataset](https://figshare.com/articles/dataset/Crop_Recommendation_dataset/26308696), DOI `10.6084/m9.figshare.26308696.v2`, uploaded by Saroj Mali and licensed CC BY 4.0. Figshare's record attributes copyright to the Indian Chamber of Food and Agriculture (ICFA); its description says the data were assembled from Indian rainfall, climate, and fertilizer datasets gathered by ICFA, India, and also contains an ICAR source statement. The component-source datasets are not cited in the record. Dataset attribution, checksum, validation findings, and known limits are recorded in [backend/data/README.md](backend/data/README.md).

The checked-in source CSV is `backend/data/crop_recommendation.csv`. It contains 2,200 rows with 22 labels (100 rows per crop). Validation found no missing/non-finite values or duplicate rows, so no records were removed. Nutrient columns are described as ratios but their physical measurement units are not specified by the source.

From the `backend` directory, install the pinned ML dependencies with `pip install -r requirements.txt`, then create/update the model and metadata with:

```powershell
python -m ml.train_crop_model
```

The script validates the CSV, stratifies an 80/20 train/test split with random seed 42, trains a 200-tree Random Forest on the training portion, evaluates held-out test records, and runs five-fold cross-validation only on the training portion. It saves `backend/ml/artifacts/crop_suitability_rf.joblib` and `crop_suitability_metadata.json`. The API reuses the saved model; it never retrains during a request. Retrain after updating the CSV or training code. Model artifacts are Python pickle-based files; load only trusted artifacts created by the project's training script.

The frontend sends all seven numeric inputs to `POST /api/crop-recommendation`. Flask requires exactly `N`, `P`, `K`, `temperature`, `humidity`, `ph`, and `rainfall`; it rejects invalid/non-finite values, physically invalid values, and values outside the observed training-partition ranges. The response includes `predictedCrop`, model ID/version, `featuresUsed`, and a research-use disclaimer. No confidence or probability is returned. Missing/corrupt model artifacts return HTTP 503 without a fabricated prediction. This result does not alter or feed into the existing rule-based climate-risk calculations.

For the saved model's held-out split, accuracy was **0.9955 (99.55%)** and macro-F1 was **0.9955 (rounded)**. The five-fold training-partition cross-validation accuracy was **0.9943 ± 0.0054**. There were 440 held-out examples (20 per label); the test confusion matrix had 438 correct classifications and two errors (one blackgram as maize, one rice as jute). These are measurements on this dataset split only. The data's source documentation, likely limited geographic representativeness, possible dependence among generated/augmented rows, and lack of independent field validation mean that this score does not establish real-world farming performance.

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

Flask checks the allowed crop, numeric ranges, and supported period values. It calls `analyze_scenario()` in `backend/analysis.py`, adds a timestamp, saves the result, and returns the result as JSON. Invalid input returns HTTP 400. If MongoDB cannot save the result, the API returns a generic HTTP 503 message and does not claim it was saved.

Missing or malformed JSON returns HTTP 400 with a JSON `message`; a non-JSON content type returns HTTP 415 with a JSON `message`.

`GET /api/history` retrieves up to 20 recent records from the same MongoDB `simulations` collection, newest first. An optional `limit` query parameter can request 1–100 records, for example `GET /api/history?limit=10`. It returns `{"records":[...]}`; MongoDB ObjectIds and datetimes are converted to strings before the JSON response. Invalid limits return HTTP 400. Database errors return HTTP 503 without revealing internal connection details. `GET /api/health` is a small server health check.

`POST /api/crop-recommendation` is separate from climate simulation. It predicts a crop label from seven soil/climate values with the saved Random Forest artifact. It returns HTTP 400 for a non-object JSON body, HTTP 422 for missing/extra/invalid fields or values outside physical/training ranges, and HTTP 503 if the trusted trained model or its metadata cannot be loaded. The result is a research decision-support class, not a calibrated probability or guaranteed recommendation.

History data flow: React's `getSimulationHistory()` calls Flask → Flask asks MongoDB for recent records → Flask returns JSON-safe records → React displays the values in the Simulation History section. The section loads when the page opens and refreshes after a successful simulation save or when the user presses Refresh.

The first history query asks MongoDB to create an idempotent compound index on `createdAt` and `_id`, matching the newest-first sort. This adds an index only; database and collection names are unchanged.

## Environment and deployment safety

- Backend configuration is in `backend/.env.example`: `MONGODB_URI`, `MONGODB_DATABASE`, `APP_ENV`, `FLASK_DEBUG`, and `CORS_ORIGINS`.
- `CORS_ORIGINS` is a comma-separated list of exact `http://` or `https://` origins, without paths. In development, a missing/blank setting allows only `http://localhost:5173` and `http://127.0.0.1:5173`. Outside development, a missing/blank setting allows no browser origins; configure the deployed frontend origin explicitly.
- Wildcard origins and malformed values are rejected. CORS controls which browser pages may read responses; it is not authentication and does not prevent direct API calls.
- The Flask built-in server may be run only with `APP_ENV=development`. Debug is off by default and requires an explicit `FLASK_DEBUG=true` opt-in, and it is never enabled outside development. Production must use a production WSGI server and HTTPS rather than `python app.py`.
- Set `VITE_API_URL` to the backend's public API origin in the frontend build environment. Frontend variables are visible to users and must contain no secrets.
- The application has no authentication or per-user history ownership. Anyone who can reach the API can submit simulations and read the shared history. Do not store sensitive or personally identifying information; CORS alone does not make history private.

Run backend tests from the `backend` directory with:

```powershell
python -m ml.train_crop_model
python -B -m unittest discover -s tests -v
```

The test command includes an integration check that uses the real trained Random Forest artifact, so train the model first if no artifact exists. MongoDB operations in the tests are mocked; no live MongoDB service is needed.

## Field image upload and preview

The Field image section is a frontend-only feature. Choose a JPG, JPEG, PNG, or WebP file up to 10 MB to preview it in the browser. The selected file is not sent to Flask and is not stored in MongoDB. The user can replace or remove the preview. Invalid formats, empty files, oversized files, and browser preview errors display helpful messages. Image dimensions are shown after the browser loads the preview.

React creates a temporary object URL for the selected local file. It revokes that URL when the image is replaced or removed, or when the component is unmounted. The `accept` attribute helps filter the file picker, while JavaScript checks file extension, MIME type when supplied, and file size.

This feature does not perform segmentation, image analysis, or image generation. SAM segmentation and ControlNet / Stable Diffusion future-field generation are planned integrations only; none of those models run in the app.

## Calculation explanation

The functions in `backend/analysis.py` use short, illustrative rules. They are teaching assumptions, not validated agronomic predictions:

- Crop-specific multipliers change the illustrative heat, drought, and salinity responses: Rice uses `1.0 / 1.2 / 0.8`, Wheat `0.9 / 0.8 / 0.8`, Maize `1.0 / 0.9 / 0.9`, and Tomato `1.1 / 0.9 / 1.1` (heat / drought / salinity). These are chosen demonstration values, not sourced crop traits.
- Heat stress begins above 30°C; its base score increases by 5 per degree. Drought stress is the selected drought duration as a fraction of 60 days; salinity stress is the selected salinity as a fraction of 50%.
- Every exposure is scaled by `simulationPeriod / 30`, making 30 days the illustrative reference period. The same inputs over 60 days therefore have twice the exposure factor of a 30-day scenario.
- Crop health starts at 100 and subtracts period-scaled heat above 35°C, drought, and salinity penalties modified by the selected crop multipliers. Scores stay within 0–100.
- Risk is a weighted combination: 30% heat, 40% drought, and 30% salinity.
- Yield loss is a simple fraction of lost crop health.
- Financial loss applies that yield-loss percentage to a fixed example baseline of **$2,200 USD per acre**. It is an illustrative currency baseline, not actual farm revenue.

The soil-moisture estimate also scales the drought/salinity reduction by `simulationPeriod / 30`. These simple rules do not model particular crop varieties, locations, soils, or real farm economics.

### Calculation functions

| Function | Purpose |
|---|---|
| `period_factor(period)` | Converts the selected period to a factor relative to 30 days. |
| `calculate_heat_stress(...)` | Converts temperature above 30°C into a crop- and period-adjusted 0–100 heat score. |
| `calculate_drought_stress(...)` | Converts drought days into a crop- and period-adjusted 0–100 drought score. |
| `calculate_salinity_stress(...)` | Converts salinity percent into a crop- and period-adjusted 0–100 salinity score. |
| `calculate_crop_health(...)` | Subtracts crop-adjusted heat, drought, and salinity penalties from 100 and bounds the result. |
| `calculate_risk_score(...)` | Combines the three rounded stress scores using the configured 30/40/30 weights. |
| `get_risk_category(...)` | Maps the overall score into the illustrative Low, Moderate, or High band. |
| `calculate_canopy_loss(...)` | Estimates canopy loss from the crop-health reduction. |
| `calculate_soil_moisture(...)` | Estimates remaining moisture from drought and salinity inputs over the selected period. |
| `calculate_yield_loss(...)` | Converts the crop-health reduction to an illustrative yield-loss percentage. |
| `calculate_financial_loss(...)` | Applies the bounded yield-loss percentage to the fixed USD example baseline. |
| `analyze_scenario(data)` | Calls the functions above and assembles the API result, including the assumptions used. |

### What the risk and financial outputs mean

- **Crop health (0–100%)** is the prototype score remaining after heat, drought, and salinity penalties. It is not measured from a field image.
- **Stress scores (0–100%)** separately summarize the selected heat, drought, and salinity inputs after applying the crop multipliers and period factor.
- **Risk score (0–100)** combines the displayed stress scores with 30% heat, 40% drought, and 30% salinity weights. The categories are Low below 34, Moderate from 34 through 66, and High from 67. These bands are demonstration labels.
- **Yield-loss estimate (0–100%)** is 80% of the crop-health reduction: `round((100 - cropHealth) * 0.8)`.
- **Financial-impact estimate per acre** is `round(yieldLossPercent * 2200 USD / 100)`. The backend clamps yield loss to 0–100, so impact cannot be negative or exceed the example baseline.

For example, Rice at 35°C, 10 drought days, 0% salinity over 30 days gives heat stress 25, drought stress 20, salinity stress 0, crop health 94, risk score 16 (15.5 before rounding), yield-loss estimate 5%, and financial-impact estimate $110 USD per acre. These values illustrate the arithmetic only; they are not verified agricultural or financial outcomes.

The backend response includes the selected crop assumptions, risk weights, risk thresholds, financial currency, and example baseline, so the interface can explain the exact assumptions used without recalculating results in JavaScript.

Run the backend tests from the `backend` directory with `python -m unittest discover -s tests`.

## MongoDB setup

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` if your MongoDB address is not the default. `MONGODB_DATABASE` selects the database name. The prototype writes each input and result to one `simulations` collection and reads recent records from that same collection. It does not use accounts, relationships, or other collections.

## Current limitations and future work

The climate-risk, yield-loss, and financial outputs remain rule-based prototype estimates. Users can preview a selected local image, but the app does not upload, store, or analyze it. Other field images are static illustrative references. Candidate-gene table rows are interface placeholders, not gene identifiers or discoveries, and no guide sequence is supplied. The app does not run SAM, ControlNet, Stable Diffusion, OpenCV, an LLM/RAG system, ESM-2, or DNABERT. It does not design or validate CRISPR guides or perform gene editing. Future work could connect suitable models and trusted datasets, then validate results with agricultural and biological experts before making practical claims.

The crop-suitability Random Forest is the one trained classifier currently integrated. It is not the climate-risk model, image analysis, yield prediction, genomic inference, or CRISPR guide design. Do not interpret it as a general recommendation outside the dataset's feature support or as a replacement for local agronomy advice.

See [VIVA_GUIDE.md](VIVA_GUIDE.md) for short explanations of the project and its technologies.