from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
import os
import json

load_dotenv()

openai.api_key = os.getenv("openai_api")
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    data: dict

def analysis_with_llama(data):
    prompt = '''
    Digest the data and have an overview of how the health of each record looks like and how can it be interpreted. Also, you have to predict which patient has more risk.
    Risk Thresholds:
    --------------
    Metric | Borderline | High Risk
    ----------------|----------------|----------------
    A1C | ≥ 5.7% | ≥ 6.5%
    LDL | ≥ 130 mg/dL | ≥ 160 mg/dL
    Vitamin D | ≤ 30 ng/mL | < 20 ng/mL
    Blood Pressure | ≥ 130/80 mmHg | ≥ 140/90 mmHg
    Glucose | ≥ 100 mg/dL | ≥ 126 mg/dL
    '''
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Here is the data:\n {json.dumps(data)}"}
        ],
        max_tokens=2000,
        temperature=0.1
    )

    bot_response = response.choices[0].message.content
    print(bot_response)
    return bot_response

@app.post("/api/insights")
async def get_insights(patient_data: PatientData):
    try:
        insights = analysis_with_llama(patient_data.data)
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
