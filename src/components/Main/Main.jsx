import { Subscription, Input } from '../index';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main.scss';

function Main() {
  const [inputVisib, setInputVisib] = useState(false);
  const subscriptions = useSelector(({ subscriptions }) => subscriptions.subscriptions);

  const setInputVisibFalse = () => {
    setInputVisib(false);
  };

  return (
    <div className="main">
      <div className="main__header">
        <span>Subscriptions:</span>
        <button onClick={() => setInputVisib(true)}>
          <span className="material-icons">add_circle_outline</span> add
        </button>
      </div>
      <div className="list">
        <div className="list__header">
          <span className="list__service">service:</span>
          <span className="list__price-text">
            price <br />
            (USD/month):
          </span>
          <span className="list__payment-text">
            payment every <br />
            month on the:
          </span>
        </div>
        <hr />
        {inputVisib && <Input setInputVisibFalse={setInputVisibFalse} />}
        <div className="list__items">
          {subscriptions &&
            subscriptions.map((obj, index) => (
              <Subscription
                index={index}
                service={obj.service}
                price={obj.price}
                payment={obj.payment}
                color={obj.color}
                key={`${index}_${obj.color}_${Math.random().toString(36).substring(7)}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
