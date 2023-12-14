export type Ticket = {
  id: string;
  msg_id: string;
  status: string;
  message: Message;
  context_messages: Array<string>;
  timestamp: Date;
  last_status_change?: Date;
};

export type Message = {
  id: string;
  author: User;
  timestamp: Date;
  content: string;
  msg_url: string;
};

export type User = {
  id: string;
  name: string;
  nickname: string;
  avatar_url: string;
  color: string;
};