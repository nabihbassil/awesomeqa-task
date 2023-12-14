import styles from "./homeDescription.module.css";

type TitlePagePropsType = {
  title: string;
  description: string;
}

const HomeDescription = ({title, description}: TitlePagePropsType) => {
  return (
    <div>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  )
}

export default HomeDescription;
