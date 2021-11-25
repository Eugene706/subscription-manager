export const addSubscription = (payload) => ({
  type: 'ADD_SUBSCRIPTION',
  payload,
});

export const totalPrice = (payload) => ({
  type: 'CALC_TOTALPRICE',
  payload,
});

export const deleteSubscription = (payload) => ({
  type: 'DELETE_SUBSCRIPTION',
  payload,
});
