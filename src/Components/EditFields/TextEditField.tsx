import { useTextEditField } from "Hooks/Components/EditFields/TextEditField";
import { Props } from "Types/ComponentsProps/EditFields/TextEditField";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import styles from "./TextEditField.module.css";
import { FaXmark } from "react-icons/fa6";
const TextEditField = ({ preText, value, setValue, submit }: Props) => {
  const { handleChange, handleSubmit, isEdit, isLoading, setIsEdit } =
    useTextEditField({ setValue, submit, value });
  return (
    <p className={styles.container}>
      <span>{preText}</span>
      {isEdit ? (
        <>
          <input
            className={styles.field}
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button
            className={styles.buttonBlue}
            type="button"
            onClick={handleSubmit}
          >
            <FaCheck />
          </button>
          <button
            className={styles.buttonRed}
            type="button"
            onClick={() => setIsEdit(false)}
          >
            <FaXmark  />
          </button>
        </>
      ) : (
        <>
          <span>{value}</span>
          <button
            className={styles.buttonBlue}
            type="button"
            onClick={() => setIsEdit(true)}
          >
            <FaPen />
          </button>
        </>
      )}
      {isLoading && <div>Loading...</div>}
    </p>
  );
};

export default TextEditField;
