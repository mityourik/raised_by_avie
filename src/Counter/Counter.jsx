import { useEffect, useState, useRef } from 'react';
import './Counter.css';

function Counter() {
  const [totalSum, setTotalSum] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(0);
  const descriptionRef = useRef(null);
  const [prevDescription, setPrevDescription] = useState('');

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
      setCurrentTransactionIndex((currentIndex) =>
        (currentIndex + 1) % transactions.length
      );
    }, 3600);

    return () => clearInterval(interval);
  }, [transactions]);

  useEffect(() => {
    if (transactions.length > 0 && descriptionRef.current) {
      const currentDescription = transactions[currentTransactionIndex].description;
      if (prevDescription !== currentDescription) {
        descriptionRef.current.style.animation = 'none';
        setTimeout(() => {
          descriptionRef.current.style.animation = '';
        }, 10);
        setPrevDescription(currentDescription);
      }
    }
  }, [currentTransactionIndex, transactions]);

  return (
    <section className="counter">
      <h1 className='counter__title'>-{totalSum}р.</h1>
      <div className='sdf'>
        {transactions.length > 0 && (
          <p ref={descriptionRef} className={`description`}>
            {transactions[currentTransactionIndex].description} {transactions[currentTransactionIndex].sum}руб.
          </p>
        )}
      </div>
    </section>
  );
}

export default Counter;
