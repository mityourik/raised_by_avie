import { useState, useEffect } from 'react';
import './Counter.css';
const urlAvie = 'https://damp-atoll-76234-0960ac4bbb45.herokuapp.com/data';

function Counter() {
  // Создаем состояние для хранения данных
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(urlAvie)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <section className='counter'>
      <h3 className='counter__undertitle'>на сегодня</h3>
      <h1 className='counter__title'>{data ? data.amount : 'Ща...'}</h1>
      <div className='description'>
        <p className='description__transport'>
          {data ? `Транспорт - ${data.transport}` : 'Данные загружаются...'}
        </p>
        <p className='description__food'>
          {data ? `Питание - ${data.food}` : 'Данные загружаются...'}
        </p>
        <p className='description__apartments'>
          {data ? `Проживание - ${data.apartments}` : 'Данные загружаются...'}
        </p>
        <p className='description__phone'>
          {data ? `Прочее - ${data.other}` : 'Данные загружаются...'}
        </p>
      </div>
    </section>
  );
}

export default Counter;
