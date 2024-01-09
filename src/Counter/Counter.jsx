import { useEffect, useState } from 'react';
import './Counter.css';

function Counter() {
  const [totalSum, setTotalSum] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(0);
  const [descriptionVisible, setDescriptionVisible] = useState(true); // Добавлено состояние для видимости описания

  useEffect(() => {
    fetch('https://salty-stream-91558-38753e8b9d87.herokuapp.com/transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTransactions(data);
        const sum = data.reduce((acc, item) => acc + item.sum, 0);
        setTotalSum(sum);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDescriptionVisible(false); // Скрываем описание перед изменением индекса

      setTimeout(() => {
        setCurrentTransactionIndex((currentIndex) =>
          (currentIndex + 1) % transactions.length
        );

        setDescriptionVisible(true); // Показываем новое описание после изменения индекса
      }, 1000); // Задержка для синхронизации с анимацией

    }, 3600);

    return () => clearInterval(interval);
  }, [transactions]);

  return (
    <section className="counter">
      <h1 className='counter__title'>-{totalSum}р.</h1>
      <div className='sdf'>
        {transactions.length > 0 && (
            <p className={`description ${descriptionVisible ? 'visible' : ''}`}>
                {transactions[currentTransactionIndex].description} - {transactions[currentTransactionIndex].sum}руб.
            </p>
        )}
      </div>
    </section>
  );
}

export default Counter;
