/* eslint-disable react-hooks/exhaustive-deps */
import user from '../../img/user.png';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './user.scss';
import { Diagram } from '../index';
import { totalPrice } from '../../redux/actions/subscriptions';

function UserInfo() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(true);
  const [profit, setProfit] = useState(57);

  const totalPriceNum = useSelector(({ subscriptions }) => subscriptions.totalPrice);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('theme', 'light');
    } else {
      document.documentElement.setAttribute('theme', 'dark');
    }
  }, [theme]);

  useEffect(() => {
    dispatch(totalPrice());
  }, []);

  const editProfit = () => {
    const userProfit = +prompt('Enter your profit', '');
    if (typeof userProfit === 'number' && userProfit > 0) {
      setProfit(userProfit);
    }
  };

  return (
    <div className="user">
      <div className="user__container">
        <div className="user__header">
          <div className="user__part">
            <img src={user} alt="user" />
            <span>User</span>
          </div>
          <button className="material-icons" onClick={() => setTheme(!theme)}>
            {theme ? 'brightness_5' : 'brightness_4'}
          </button>
        </div>
        <div className="user__info">
          <div className="user__profit">
            <span className="user__title">Your Profit</span>
            <div className="user__profit-part">
              <span>{profit}</span>
              <button className="material-icons" onClick={editProfit}>
                edit
              </button>
            </div>
            <span className="user__text">USD/month</span>
          </div>
          <hr className="user__line" />
          <div className="user__currency">
            <span className="user__subs">Subscription</span>
            <span className="user__currency-sum">{totalPriceNum}</span>
            <span className="user__text">USD/month</span>
          </div>
        </div>
        <Diagram profit={profit} subscription={totalPriceNum} />
      </div>
    </div>
  );
}

export default UserInfo;
