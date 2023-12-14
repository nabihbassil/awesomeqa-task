import React, { useEffect, useState } from 'react';
import {getMessage } from '../../services/API';
import MessageItem from '../../components/messageDetail';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Message } from '../../Models/interfaces';
import HeadComponent from '../../components/Head';
import HomeDescription from '../../components/homeDescription';

const TicketDialog = () => {
  const router = useRouter()
  const ticketid = router.query.id;

    const [contextMessages, setContextMessages] = useState<Message[]>([]);
    const [mainMessageData, setMainMessageData] = useState(null);


    async function fetchMessageInfo(messageIDs: string[]) {
        try {
            const messages = await Promise.all(messageIDs.map(id => getMessage(id)));
            setContextMessages(messages);
        } catch (error) {
            console.error('Error fetching message info:', error);
        }
    }

    useEffect(() => {
        try {
            const dataString = Cookies.get(`info_${ticketid}`);
            if (dataString) {
                const data = JSON.parse(dataString);
                setMainMessageData(data);
                fetchMessageInfo(data.context_messages);
                
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [ticketid]);



    return (
        <>
            {mainMessageData && contextMessages ? (
                <>
                <div>
    <HeadComponent title={'Ticket Details'} metaData={'Moderate Discord Messages'} />
    <HomeDescription title={'Ticket Details'} description={''} />
    </div>
                   <div>
                   <MessageItem
                                    key={mainMessageData.id}
                                    name={mainMessageData.name}
                                    avatar={mainMessageData.avatar}
                                    content={mainMessageData.content}
                                    contextMessages={contextMessages}
                                    timestamp={mainMessageData.timestamp}
                                    status={mainMessageData.status}
                                />
                    </div>
                  
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default TicketDialog;