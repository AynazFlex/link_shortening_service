import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IData } from "../../api/api";
import { login } from "../../store/authReducer";
import { RootState, useAppDispatch } from "../../store/store";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();
  const { error, isAuth, isPending } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submit = handleSubmit((data) => {
    dispatch(login(data));
  });

  useEffect(() => {
    isAuth && navigate("/", { replace: true });
  }, [isAuth]);

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
        <input disabled={isPending ? true : false} type="submit" value="login" />
        {error.length > 0 && <div>{error}</div>}
      </form>
      <div>
        if you want to register, click on
        <Link to="/register">register</Link>
      </div>
    </div>
  );
};

export default Login;
