import React from 'react';
import { Typography, Box } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import HeadComponent from '../../components/Head';
import styles from '../../styles/Home.module.css'
import HomeDescription from '../../components/homeDescription';

const UnderConstructionPage = () => {
  return (
    <div className={styles.container}>
      <HeadComponent title={'Page Unavailable'} metaData={'Moderate Discord Messages'} />
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <HomeDescription title={'AwesomeQA'} description={'Page is still under construction'} />
        <ConstructionIcon style={{ fontSize: 100 }} />
      </Box>
    </div>
  );
};

export default UnderConstructionPage;