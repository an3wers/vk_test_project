import { useQuery } from "@tanstack/react-query";
import { getFact } from "../api/fact-generator.api";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const FactGenerator = () => {
  const {
    data: fact,
    refetch: submitRequest,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["facts"],
    queryFn: getFact,
    enabled: false,
  });

  const textFiels = useRef<HTMLTextAreaElement | null>(null);

  const getFactHandler = () => {
    submitRequest();
  };

  useEffect(() => {
    if (textFiels.current && fact?.fact) {
      textFiels.current.value = fact.fact;
      textFiels.current.focus();

      // возвращаем индекс первого пробела
      const firstWordIndexEnd = fact.fact.indexOf(" ");

      if (firstWordIndexEnd !== -1) {
        // Ставим курсор после первого слова
        textFiels.current.setSelectionRange(
          firstWordIndexEnd,
          firstWordIndexEnd
        );
      }
    }
  }, [fact]);

  return (
    <section className={styles.section}>
      <h2>Генератор фактов</h2>
      {isError && <small>При получении факта произошла ошибка</small>}
      <div>
        <button onClick={getFactHandler} disabled={isFetching}>
          Получить факт
        </button>
      </div>
      <textarea
        name='fact-filed'
        rows={4}
        cols={60}
        ref={textFiels}
        disabled={isFetching}
      ></textarea>
    </section>
  );
};
