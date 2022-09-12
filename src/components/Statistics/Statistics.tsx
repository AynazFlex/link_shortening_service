import { FC, useState } from "react";
import styles from "./Styles.module.scss";
import Table from "./Table";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Stataistics: FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.statistics}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        Statistics {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div>{isOpen && <Table />}</div>
    </div>
  );
};

export default Stataistics;
