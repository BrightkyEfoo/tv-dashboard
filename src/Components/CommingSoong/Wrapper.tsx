import { Props } from "Types/ComponentsProps/CommingSoon/Wrapper";
import styles from "./Wrapper.module.css";

const Wrapper = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      {children} <span className={styles.soonSpan}>SOON</span>
    </div>
  );
};

export default Wrapper;
