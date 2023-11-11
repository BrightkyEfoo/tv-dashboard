import { ButtonClickEvent } from "Types/CommonTypes/Events";
import { Props } from "Types/ComponentsProps/Cards/Wrapper1";
import { FaTrash } from "react-icons/fa";
import styles from "./Wrapper1.module.css";

const Wrapper1 = ({ name, handleEdit, handleDelete, children }: Props) => {
  const handleClick1 = (e: ButtonClickEvent) => {
    handleEdit();
  };
  const handleClick2 = (e: ButtonClickEvent) => {
    handleDelete();
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>{name}</p>
      {children}
      <button className={styles.edit} onClick={handleClick1}>
        Edit
      </button>
      <button className={styles.delete} onClick={handleClick2}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Wrapper1;
