import { DataGrid, GridOverlay, GridToolbar, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, useGridApiRef } from '@mui/x-data-grid';
import { Avatar, Box, Card, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Select, TableCell, TextField, Typography, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { getTickets, resolveTicket, deleteTicket, getMessage, openTicket } from '../../services/API';
import { Ticket, Message } from '../../Models/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import styles from './ticketTable.module.css'



const TableComponent = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const apiRef = useGridApiRef();


  function CustomToolbar() {
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');


    const handleStatusChange = (event) => {
      setStatus(event.target.value);
      apiRef.current.setFilterModel({
        items: [
          {
            field: 'status',
            operator: 'contains',
            value: event.target.value,
          },
        ],
      });
    };

    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
      apiRef.current.setFilterModel({
        items: [
          {
            field: 'content',
            operator: 'contains',
            value: event.target.value,
          },
        ],
      });
    };

    return (
      
      <GridToolbarContainer>
      <Box display="flex" justifyContent="space-between" width="100%">
        <div style={{display: 'flex'}}>
          <GridToolbarFilterButton className={styles.filterButton}  />
          <GridToolbarDensitySelector className={styles.filterButton} />
        </div>
        <div >
          <FormControl variant="outlined" sx={{width: '7.5rem', margin: '0.5rem'}} >
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={status} onChange={handleStatusChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="open">Open</MenuItem>
          </Select>
        </FormControl>
          <TextField
            value={searchText}
            onChange={handleSearchChange}
            label="Search Content"
            sx={{margin: '0.5rem'}}
          />
        </div>
      </Box>
    </GridToolbarContainer>
    );

  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getTickets();
        setTickets(tickets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await Promise.all(tickets.map(ticket => getMessage(ticket.msg_id)));
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [tickets]);


  const NoRowsComponent = () => {
    return (
      <GridOverlay>
        <Typography variant="h6">No current tickets available</Typography>
      </GridOverlay>
    );
  };

  const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#42464C',
    },
    '& .MuiDataGrid-cell': {
      cursor: 'pointer',
    },

  });

  const handleResolve = async (id: string) => {
    try {
      await resolveTicket(id);
      const tickets = await getTickets();
      setTickets(tickets);
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  const handleOpen = async (id: string) => {
    try {
      await openTicket(id);
      const tickets = await getTickets();
      setTickets(tickets);
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTicket(id);
      const tickets = await getTickets();
      setTickets(tickets);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleExpand = (id: string, context_messages: string[], status: string, content: string, avatar: string, name: string, timestamp: string) => {
    try {
      const data = { id, context_messages, status, content, avatar, name, timestamp };
      const dataString = JSON.stringify(data);
      Cookies.set(`info_${id}`, dataString);
      window.open(`/message/${id}`, '_blank');
    } catch (error) {
      console.error('Error expanding ticket:', error);
    }
  };
  const rows = tickets.map(ticket => {
    const message = messages.find(message => message.id === ticket.msg_id);
    return {
      ...ticket,
      content: message?.content,
      username: message?.author.name,
      avatar: message?.author.avatar_url,
    };
  });

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      flex: 0.7,
      renderCell: (params) => {

        return (
          <Card sx={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none', border: 'none' }}>
            <CardHeader
              avatar={<Avatar src={params.row.avatar} />}
              title={params.row.username}
            />
          </Card>
        )
      },
    },
    {
      field: 'content',
      headerName: 'Message',
      flex: 2,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              color: params.value === 'resolved' ? 'green' : 'red',
              fontWeight: 'bold'
            }}
          >
            {params.value}
          </Box>
        );
      },
    },

    {
      field: 'timestamp', headerName: 'Timestamp', flex: 0.6,
      filterable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      }
    },
    {
      field: 'Expand',
      headerName: 'Expand',
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <IconButton color="primary" onClick={() => handleExpand(params.row.id, params.row.context_messages, params.row.status, params.row.content, params.row.avatar, params.row.username, params.row.timestamp)}>
            <AddIcon />
          </IconButton>
        )
      },
    },
    {
      field: 'resolve',
      headerName: 'Resolve',
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color={params.row.status === 'open' ? 'success' : 'default'}
          onClick={() => params.row.status === 'open' ? handleResolve(params.row.id) : handleOpen(params.row.id)}
        >
          <CheckCircleIcon />
        </IconButton>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      )
    },
    {
      field: 'Discord',
      headerName: 'Discord',
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const message = messages.find(message => message.id === params.row.msg_id);
        return message ? (
          <IconButton style={{ color: '#9747FF' }} onClick={() => window.open(message.msg_url, '_blank')}>
            <LaunchIcon />
          </IconButton>
        ) : '';
      },
    },

  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="1600">
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <div className={styles.tickeTable} >
      <StyledDataGrid
        rows={rows} columns={columns} rowHeight={70}
        apiRef={apiRef}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        slots={{
          noRowsOverlay: NoRowsComponent,
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            color: '#ffff',
          },
        }}

      />
    </div>
  );
};

export default TableComponent;