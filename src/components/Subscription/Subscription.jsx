import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { deleteSubscription, totalPrice } from '../../redux/actions/subscriptions';
import './subscription.scss';

function Subscription({ index, service, price, payment, color }) {
  const subscriptionRef = useRef();
  const dispatch = useDispatch();

  const deleteSubs = () => {
    subscriptionRef.current.classList.add('animation');
    setTimeout(() => {
      dispatch(deleteSubscription(index));
      dispatch(totalPrice());
    }, 550);
  };

  return (
    <div className="list__item" ref={subscriptionRef}>
      <div className="list__logo">
        <span className="list__logo-text" style={{ color: color }}>
          {service[0]}
        </span>
        <div className="list__logo-bg" style={{ backgroundColor: color }}></div>
      </div>
      <span className="list__name">{service}</span>
      <span className="list__price">$ {price}</span>
      <span className="list__payment">{payment}th</span>
      <div className="list__actions">
        <button className="list__edit material-icons">create</button>
        <button className="list__delete material-icons" onClick={deleteSubs}>
          delete
        </button>
      </div>
    </div>
  );
}

export default Subscription;
