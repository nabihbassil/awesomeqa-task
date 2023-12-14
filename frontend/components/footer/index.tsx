import { Box, Typography, Link, IconButton } from "@mui/material";
import styles from "./footer.module.css";
import Image from "next/image";
import Icon from '../../public/CompLogo.svg'; // replace with your image path

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Box>
        <Typography variant="body1">
          Created by <Link href="mailto:nabihbassil@gmail.com">Nabih Bassil</Link>
        </Typography>
        <Typography variant="body1">
          Learn more about <Link href="https://awesomeqa.xyz" target="_blank" rel="noopener noreferrer">Awesome QA</Link>
          <Link href="https://awesomeqa.xyz" target="_blank" rel="noopener noreferrer">
          <IconButton className={styles.logo}>
            <Image src={Icon} alt="Awesome QA Icon" />
          </IconButton>
        </Link>
        </Typography>

      </Box>    
    </footer>
  );
};

export default Footer;