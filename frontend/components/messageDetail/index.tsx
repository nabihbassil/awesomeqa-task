import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, List, ListItem, ListItemAvatar, ListItemText, Box } from '@mui/material';
import { format } from 'date-fns';

function MessageItem({ name, avatar, content, contextMessages, timestamp, status }) {
    return (
        <>
            <Card sx={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none',  border: 'none' }}>
                <CardHeader title={'Ticket Message:'} />
            </Card>
            <Card sx={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}>
                <CardHeader
                    avatar={<Avatar src={avatar} />}
                    title={<div>
                        {name}
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginLeft: 1 }}
                        >
                            {format(new Date(timestamp), 'dd.MM.yy HH:mm')}
                        </Typography>
                    </div>}
                    subheader={content}
                    action={
                        <Box
                            sx={{
                                border: `1px solid ${status === 'resolved' ? 'green' : 'red'}`,
                                backgroundColor: `${status === 'resolved' ? 'green' : 'red'}`,
                                borderRadius: '9px',
                                padding: '0.4rem',
                                display: 'inline',
                            }}
                        >
                            <Typography
                                component="span"
                                variant="body2"
                            >
                                {status}
                            </Typography>
                        </Box>
                    }
                />

                <CardContent>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Context Messages:
                    </Typography>
                    <List>
                        {contextMessages.map((message, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar src={message.author.avatar_url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <div>
                                            {message.author.nickname}
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ marginLeft: 1 }}
                                            >
                                                {format(new Date(message.timestamp), 'dd.MM.yy HH:mm')}
                                            </Typography>
                                        </div>
                                    }
                                    secondary={message.content}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </>
    );

}

export default MessageItem;