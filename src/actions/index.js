export const GET_USER = "get_user"

export const getUser = (dataName) => ({
    type: GET_USER,
    payload: {
      name: dataName,
    }
  });