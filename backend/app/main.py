from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime




app = FastAPI()

TICKET_FILEPATH = "data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def root():
    return "OK"

@app.get("/tickets")
async def get_tickets(
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets()
    return JSONResponse(tickets, status_code=200)

@app.get("/tickets/{ticket_id}")
async def get_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    ticket = ticket_repository.get_ticket(ticket_id)
    return JSONResponse(ticket, status_code=200)

@app.get("/messages")
async def get_messages(
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    messages = ticket_repository.get_messages()
    return JSONResponse(messages, status_code=200)

@app.get("/messages/{message_id}")
async def get_message(
    message_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    message = ticket_repository.get_messages(message_id)
    return JSONResponse(message, status_code=200)


@app.delete("/tickets/{ticket_id}")
async def delete_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    ticket = ticket_repository.get_ticket(ticket_id)
    if not ticket:
        return JSONResponse({"error": "Ticket not found"}, status_code=404)
    ticket_repository.delete_ticket(ticket_id)
    return JSONResponse({"message": "Ticket deleted"}, status_code=200)

@app.put("/tickets/{ticket_id}/resolve")
async def resolve_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    ticket = ticket_repository.get_ticket(ticket_id)
    if not ticket:
        return JSONResponse({"error": "Ticket not found"}, status_code=404)
    ticket_repository.resolve_ticket(ticket_id)
    return JSONResponse({"message": "Ticket resolved"}, status_code=200)

@app.put("/tickets/{ticket_id}/open")
async def open_ticket(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    ticket = ticket_repository.get_ticket(ticket_id)
    if not ticket:
        return JSONResponse({"error": "Ticket not found"}, status_code=404)
    ticket_repository.open_ticket(ticket_id)
    return JSONResponse({"message": "Ticket opened"}, status_code=200)


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
