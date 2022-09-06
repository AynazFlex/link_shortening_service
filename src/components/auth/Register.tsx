import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IData } from "../../api/api";
import { registration } from "../../store/authReducer";
import { RootState, useAppDispatch } from "../../store/store";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();
  const { error, username, isPending } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const submit = handleSubmit((data) => {
    dispatch(registration(data));
  });

  return (
    <div className={styles.auth}>
      <form onSubmit={submit}>
        <label>
          username
          <input
            className={errors.username ? styles.error : undefined}
            {...register("username", { required: true })}
          />
        </label>
        <label>
          password
          <input
            className={errors.password ? styles.error : undefined}
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <input disabled={isPending ? true : false} type="submit" value="register" />
        {username.length > 0 && <div>{`the ${username} has been successfully registered`}</div>}
        {error.length > 0 && <div>{error}</div>}
      </form>
      <div>
        if you want to login, click on
        <Link to="/login">login</Link>
      </div>
    </div>
  );
};

export default Register;
