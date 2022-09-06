import { FC } from "react";
import API from "../../api/api";
import Squeezy from "../Squeezy/Squeezy";
import Stataistics from "../Statistics/Statistics";
import styles from "./Styles.module.scss";

const UserPage: FC = () => {
  return (
    <div className={styles.userPage}>
      <Squeezy />
      <Stataistics />
    </div>
  );
};

export default UserPage;
