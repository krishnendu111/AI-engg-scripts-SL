import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_client = OpenAI()
groq_client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

class BattleRequest(BaseModel):
    prompt: str

def ask(client, model, prompt):
    r = client.chat.completions.create(
        model=model, 
        messages=[{"role": "user", "content": prompt}]
    )
    return r.choices[0].message.content

@app.post("/api/battle")
def battle(req: BattleRequest):
    out_a = ask(openai_client, "gpt-4o-mini", req.prompt)
    out_b = ask(groq_client, "openai/gpt-oss-120b", req.prompt)
    return {"model_a": out_a, "model_b": out_b}

# Run with: uvicorn main:app --reload --port 8000