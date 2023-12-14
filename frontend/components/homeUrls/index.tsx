import styles from "./homeUrls.module.css";
import Link from 'next/link'
import {LibraryBooksOutlined, LightbulbOutlined, SupportAgentOutlined} from "@mui/icons-material";

const HomeUrls = () => {
  return (
    <div id="mainMenuCard" className={styles.grid}>
      <Link href="/falsePage">
        <a className={styles.card}>
        <div className={styles.cardTitle}>
        <LibraryBooksOutlined fontSize="large" sx={{ mr: 1 }}/>
          <h2>Knowledge Base</h2>
          </div>
          <p>Access information related to moderating</p>
        </a>
      </Link>


      <Link href="/tickets">
        <a className={styles.card}>
        <div className={styles.cardTitle}>
        <LightbulbOutlined fontSize="large" sx={{ mr: 1 }}/>
          <h2>Tickets</h2>
          </div>
          <p>Take a look at channel messages</p>
        </a>
      </Link>

      <Link href="/falsePage">
        <a className={styles.card}>
        <div className={styles.cardTitle}>
        <SupportAgentOutlined fontSize="large" sx={{ mr: 1 }}/>
          <h2>FAQ Insights</h2>
          </div>
          <p>Gain knowledge into common info</p>   
        </a>
      </Link>
      

    </div>
  )
}

export default HomeUrls;
