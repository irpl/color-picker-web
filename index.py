from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="template")

origins = [
    "http://localhost",
    "http://localhost:5500",
    "ecse-bot.vercel.app",
    "ecse-bot-irpl.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Color(BaseModel):
  r: int
  g: int
  b: int

thing = None

@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
  print(request)
  return templates.TemplateResponse("index.html", {"request": request})

@app.get("/color")
def read_item():
  return thing

@app.put("/color")
def update_item(color: Color):
  global thing
  thing = color
  return {
    "red": color.r,
    "green": color.g, 
    "blue": color.b  
  }