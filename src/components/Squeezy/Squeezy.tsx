import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ISqueezy } from "../../api/api";
import { squeezy } from "../../store/authReducer";
import { RootState, useAppDispatch } from "../../store/store";
import styles from "./Styles.module.scss";

const Squeezy: FC = () => {
  const { register, handleSubmit, reset } = useForm<ISqueezy>();
  const dispatch = useAppDispatch();
  const { isDone, error } = useSelector((state: RootState) => state.auth);

  const submit = handleSubmit((data) => {
    dispatch(squeezy(data));
    reset();
  });

  return (
    <div className={styles.squeezy}>
      <form onSubmit={submit}>
        <input
          placeholder="Link"
          type="text"
          {...register("link", { required: true })}
        />
        <input type="submit" value="Squeezy" />
      </form>
      {error.length > 0 && <div style={{ color: "red" }}>{error}</div>}
      {isDone && <div style={{ color: "green" }}>Done</div>}
    </div>
  );
};

export default Squeezy;
