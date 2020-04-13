import api from "../services/api";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post("/v1/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;

    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};
