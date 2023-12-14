import React, { useState } from 'react';
import TableComponent from '../../components/ticketTable';
import HeadComponent from '../../components/Head';
import HomeDescription from '../../components/homeDescription';


const TicketsPage = () => {
  return (
    <>
    <div>
    <HeadComponent title={'Ticket Moderation'} metaData={'Moderate Discord Messages'} />
    <HomeDescription title={'Start Moderating'} description={''} />
    </div>
    <div  style={{ margin: '1rem auto', width: '95%' }} > 
  
  <TableComponent  />
</div>

    </>
  );
};

export default TicketsPage;