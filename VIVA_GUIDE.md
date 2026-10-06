# AgriResilience-AI Viva Guide

The answers below use simple language. The current website is a research prototype: it demonstrates a workflow and simple calculations, not a validated scientific prediction.

## Project and purpose

1. **What is AgriResilience-AI?**  
   It is a prototype website that connects a climate scenario with crop-risk estimates and future biological research ideas.

2. **What problem does it address?**  
   Climate stress can affect crops. The prototype helps people see a possible chain from climate conditions to crop impact and adaptation research.

3. **What is macro visual simulation?**  
   It means representing a large-scale field condition, such as how a field might look under a selected climate-stress scenario. Our current visuals are illustrative, not model-generated.

4. **What is agricultural risk intelligence?**  
   It is the part that summarizes climate stress with simple scores for crop health, risk, canopy, moisture, and yield impact.

5. **What is micro genomic adaptation?**  
   It is a proposed research direction that studies genes and proteins that may be related to stress response. Our current gene examples are demonstration data.

## Frontend and backend technologies

6. **Why React?**  
   React lets us build the page from smaller reusable components, such as the simulator and result sections.

7. **Why JavaScript?**  
   JavaScript runs in the browser and handles form input, button clicks, and API requests.

8. **Why CSS?**  
   CSS controls the page layout, colors, typography, and mobile-friendly display.

9. **Why Python?**  
   Python is readable and has useful libraries for web APIs, data work, and possible future AI research.

10. **Why Flask?**  
    Flask makes it easy to create a small API route without a large server framework.

11. **Why MongoDB?**  
    MongoDB stores each simulation result as a document, which suits this simple prototype record.

12. **How does React communicate with Flask?**  
    The frontend function in `frontend/src/services/api.js` sends JSON with `fetch()` to `POST /api/simulate`. Flask returns JSON, and React displays it.

13. **What is an API?**  
    An API is a defined way for two programs to exchange requests and responses. Here, the browser sends simulation settings to Flask.

## Simulation behavior

14. **What happens when Run Simulation is clicked?**  
    React reads the form settings, shows progress text, sends the selected values to Flask, then displays the returned result or a clear connection error.

15. **Where are climate calculations performed?**  
    They are in `backend/analysis.py`, called by the Flask route in `backend/app.py`.

16. **How is risk calculated?**  
    The prototype calculates heat, drought, and salinity stress, then combines them using 30%, 40%, and 30% weighting.

17. **How is financial loss calculated?**  
    It multiplies estimated yield loss by a fixed example value of $2,200 per acre. This is not a real financial forecast.

## Proposed AI and biology concepts

18. **What is SAM?**  
    Segment Anything Model is a computer-vision model concept for identifying regions in images. It is not connected in this prototype.

19. **What is ControlNet?**  
    ControlNet is a method for guiding image generation with a structure such as an outline or depth map. It is future work here.

20. **What is Stable Diffusion?**  
    Stable Diffusion is a model family for generating images. The website does not run it; its field photos are illustrative visuals.

21. **What is OpenCV?**  
    OpenCV is a software library for image processing and computer vision. It is not currently used by the application.

22. **What is ESM-2?**  
    ESM-2 is a protein language model that can be used for protein-sequence research. It is not integrated here.

23. **What is DNABERT?**  
    DNABERT is a model approach for learning patterns from DNA sequences. It is a future model integration, not a current result source.

24. **What is a gene?**  
    A gene is a part of DNA that contains biological instructions, often used by a cell to make a functional product.

25. **What is a candidate gene?**  
    It is a gene selected for further study because it may be related to a trait. A candidate is not automatically proven to cause that trait.

26. **What is gRNA?**  
    Guide RNA is a designed RNA sequence used by some CRISPR systems to direct them toward a DNA target. The sequence shown here is only a demonstration.

27. **Is CRISPR actually being performed?**  
    No. The website does not edit genes or perform laboratory work.

28. **Are the advanced AI models actually running?**  
    No. SAM, ControlNet, Stable Diffusion, OpenCV, LLM/RAG, ESM-2, and DNABERT are future integrations unless separately connected and verified.

## Status and next steps

29. **What is implemented now?**  
    A React interface, a climate-scenario form, simple Python calculations, a Flask JSON API, MongoDB storage, and clearly labeled example genomic content.

30. **What is the future scope?**  
    Connect models and trusted climate, crop, and genomic datasets; test them with domain experts; and validate any scientific or financial claims before real-world use.