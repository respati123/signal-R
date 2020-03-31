import axios from 'axios';

export const getData = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/`);
  } catch (err) {
    return err;
  }
};

export const deleteData = async id => {
  try {
    return await axios.delete(`${process.env.REACT_APP_URL_ENDPOINT}/${id}`);
  } catch (err) {
    return err;
  }
};

export const insertData = async data => {
  try {
    return await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}`, data);
  } catch (err) {
    return err;
  }
};
