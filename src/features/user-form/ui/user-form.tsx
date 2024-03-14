/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getAge } from "../api/user-form.api";
import { SubmitHandler, useForm } from "react-hook-form";

type TInpups = { name: string };

export const UserForm = () => {
  const [nameToReq, setNameToReq] = useState("");

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TInpups>({ mode: "onChange" });

  const { data, isFetching, refetch, isError, isSuccess } = useQuery({
    queryKey: ["getUserAge"],
    queryFn: ({ signal }) => getAge(nameToReq, signal),
    enabled: false,
  });

  const requestHandler = useCallback(async () => {
    await refetch();
    reset();
    setNameToReq("");
  }, []);

  const submitHandler: SubmitHandler<TInpups> = (data) => {
    setNameToReq(data.name.trim());
  };

  const { name } = watch();

  useEffect(() => {
    if (!errors.name?.message) {
      const timerId = setTimeout(() => {
        setNameToReq(name);
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [name]);

  useEffect(() => {
    if (nameToReq && nameToReq !== data?.name) {
      // Abort request
      if (isFetching && !isSuccess) {
        queryClient.cancelQueries({ queryKey: ["getUserAge"] });
      }

      requestHandler();
    }
  }, [nameToReq]);

  return (
    <section className={styles.section}>
      <h2>Возраст пользователя</h2>
      <form
        className={styles["user-form"]}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={styles["text-field"]}>
          <label htmlFor='name'>Введите имя</label>
          <input
            id='name'
            {...register("name", {
              required: "Обязательное поле для заполнения",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Используейте только английские буквы",
              },
            })}
          />
          {errors.name && (
            <small className={styles.error}>{errors.name.message}</small>
          )}
        </div>

        <button
          type='submit'
          disabled={!!errors?.name?.message || data?.name === name}
        >
          Отправить
        </button>
      </form>
      {!isError && data?.age && (
        <p>
          Имя: {data.name} | Возраст: {data.age}
        </p>
      )}
    </section>
  );
};
