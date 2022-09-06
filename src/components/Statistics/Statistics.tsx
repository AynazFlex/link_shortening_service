import { FC, useState } from "react";
import { resetItems } from "../../store/statisticsReducer";
import { useAppDispatch } from "../../store/store";
import styles from "./Styles.module.scss";
import Table from "./Table";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Stataistics: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.statistics}>
      <button
        onClick={() => {
          isOpen && dispatch(resetItems());
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
