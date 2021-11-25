import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDispatch } from 'react-redux';
import { addSubscription, totalPrice } from '../../redux/actions/subscriptions';

import './input.scss';

function Input({ setInputVisibFalse }) {
  const dispatch = useDispatch();
  const colorPick = useRef();

  const [colorPickerVisib, setColorPickerVisib] = useState(false);
  const [color, setColor] = useState('#33333a');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [serviceError, setServiceError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleClickOutside = (e) => {
    if (!e.path.includes(colorPick.current)) {
      setColorPickerVisib(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (service) {
      if (typeof service !== 'string' || service.length > 25 || service.length < 1) {
        setServiceError(true);
      } else {
        setServiceError(false);
      }
    }
  }, [service]);

  useEffect(() => {
    if (price) {
      console.log(+price);
      if (!/^\d+$/gm.test(price) || +price < 1 || +price > 10000) {
        setPriceError(true);
      } else {
        setPriceError(false);
      }
    }
  }, [price]);

  useEffect(() => {
    if (date) {
      if (!/^\d+$/gm.test(date) || +date > 31 || +date < 1) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }
  }, [date]);

  const onSubmit = () => {
    if (!serviceError && !priceError && !dateError) {
      dispatch(addSubscription({ service: service, price: +price, payment: +date, color: color }));
      dispatch(totalPrice());
      setInputVisibFalse();
      setService('');
      setPrice('');
      setDate('');
      setColor('#33333a');
    }
  };

  return (
    <div className="input">
      <div className="input__color-picker-cont" ref={colorPick}>
        <div className="input__color-switch-container">
          <div
            className="input__color-switch"
            onClick={() => setColorPickerVisib(!colorPickerVisib)}
            style={{ backgroundColor: color }}
          >
            {parseInt(color.slice(1, 7), 16) < 8388607 ? (
              <span className="material-icons" style={{ color: 'white' }}>
                palette
              </span>
            ) : (
              <span className="material-icons color-picker-pic">palette</span>
            )}
          </div>
        </div>
        {colorPickerVisib && (
          <div className="input__color-picker">
            <HexColorPicker color={color} onChange={setColor} style={{ zIndex: 2 }} />
          </div>
        )}
      </div>

      <div className="input__service-container">
        <input type="text" className="input__service" value={service} onChange={(e) => setService(e.target.value)} />
        {serviceError && <p className="input__error">Error</p>}
      </div>
      <div className="input__price-container">
        <input type="text" className="input__price" value={price} onChange={(e) => setPrice(e.target.value)} />
        {priceError && <p className="input__error">Error</p>}
      </div>
      <div className="input__payment-container">
        <input type="text" className="input__payment" value={date} onChange={(e) => setDate(e.target.value)} />
        {dateError && <p className="input__error">Error</p>}
      </div>

      <div className="input__actions">
        <button className="input__accept material-icons" onClick={onSubmit}>
          check_circle
        </button>
        <button className="input__cancel material-icons" onClick={setInputVisibFalse}>
          cancel
        </button>
      </div>
    </div>
  );
}

export default Input;
