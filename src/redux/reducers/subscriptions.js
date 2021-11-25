const initialState = {
  subscriptions: [
    { service: 'Netflix', price: 14.59, payment: 12, color: '#FFB404' },
    { service: 'Youtube', price: 5, payment: 1, color: '#FF0000' },
    { service: '1', price: 5, payment: 1, color: '#FF0000' },
    { service: '2', price: 5, payment: 1, color: '#FF0000' },
    { service: '3', price: 5, payment: 1, color: '#FF0000' },
    { service: '4', price: 5, payment: 1, color: '#FF0000' },
    { service: '5', price: 5, payment: 1, color: '#FF0000' },
    { service: '6', price: 5, payment: 1, color: '#FF0000' },
  ],
  totalPrice: 0,
};

const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: [action.payload, ...state.subscriptions],
      };

    case 'CALC_TOTALPRICE':
      let currentTotalPrice = 0;
      if (state.subscriptions.length >= 2) {
        state.subscriptions.forEach((subscription) => {
          currentTotalPrice += subscription.price;
        });
      } else if (state.subscriptions.length === 1) {
        currentTotalPrice = state.subscriptions[0].price;
      } else {
        currentTotalPrice = 0;
      }

      return {
        ...state,
        totalPrice: currentTotalPrice,
      };
    case 'DELETE_SUBSCRIPTION':
      return {
        ...state,
        subscriptions: state.subscriptions.filter((e, item) => {
          return item !== action.payload;
        }),
      };

    default:
      return state;
  }
};

export default subscriptions;
