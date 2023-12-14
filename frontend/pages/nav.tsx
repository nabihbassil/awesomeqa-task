import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import HomeDescription from "../components/homeDescription";
import HomeUrls from "../components/homeUrls";
import HeadComponent from "../components/Head";

const Nav: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadComponent title={'Moderator Dashboard'} metaData={'Moderate Discord Messages'} />
      <main className={styles.main}>
        <HomeDescription title={'AwesomeQA'} description={'Moderating Discord, one message at a time'} />
        <HomeUrls />
      </main>
    </div>
  )
}

export default Nav
