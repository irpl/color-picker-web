import os
from fastapi import FastAPI, Request, status
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import motor.motor_asyncio

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="template")

origins = [
    "http://localhost",
    "http://localhost:5500"
]

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.color

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Color(BaseModel):
  i: str
  r: int
  g: int
  b: int

thing = None

@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
  print(request)
  
  return templates.TemplateResponse("index.html", {"request": request})

@app.get("/color", response_model=List[Color])
async def read_item():
  leds = await db["leds"].find().to_list(999)
  # print(leds)
  return leds

@app.put("/color", response_model=Color)
async def update_item(color: Color):
  color = jsonable_encoder(color)
  print(color)
  led = await db["leds"].find_one({"i": color["i"]})
  if led:
    updated_result = await db["leds"].update_one({"i": color["i"]}, {"$set": color})
    if updated_result.modified_count == 1:
      if ( updated_led := await db["leds"].find_one({"i": color["i"]}) ) is not None:
        led = updated_led
  else:
    new_led = await db["leds"].insert_one(color)
    led = await db["leds"].find_one({"_id": new_led.inserted_id})
  return led
