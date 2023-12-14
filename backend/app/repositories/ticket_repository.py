import json
from typing import Optional
from datetime import datetime



class TicketRepository:
    def __init__(self, filepath: str):
        self.filepath = filepath
        with open(filepath, 'r') as f:
            self.data = json.load(f)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][:limit]

    def get_ticket(self, ticket_id: str) -> Optional[dict]:
        for ticket in self.data["tickets"]:
            if ticket["id"] == ticket_id:
                return ticket
        return None
    
    def get_messages(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["messages"][:limit]

    def get_messages(self, message_id: str) -> Optional[dict]:
        for message in self.data["messages"]:
            if message["id"] == message_id:
                return message
        return None
    
    def delete_ticket(self, ticket_id: str):
        self.data["tickets"] = [ticket for ticket in self.data["tickets"] if ticket["id"] != ticket_id]
        with open(self.filepath, 'w') as f:
            json.dump(self.data, f, indent=4)

    def resolve_ticket(self, ticket_id: str):
        for ticket in self.data["tickets"]:
            if ticket["id"] == ticket_id:
                ticket["status"] = "resolved"
                ticket["ts_last_status_change"] = datetime.now().isoformat()
                with open(self.filepath, 'w') as f:
                    json.dump(self.data, f, indent=4)
                return
        raise ValueError(f"Ticket with id {ticket_id} not found")
    
    def open_ticket(self, ticket_id: str):
        for ticket in self.data["tickets"]:
            if ticket["id"] == ticket_id:
                ticket["status"] = "open"
                ticket["ts_last_status_change"] = datetime.now().isoformat()
                with open(self.file_path, 'w') as f:
                    json.dump(self.data, f, indent=4)
                return
        raise ValueError(f"Ticket with id {ticket_id} not found")