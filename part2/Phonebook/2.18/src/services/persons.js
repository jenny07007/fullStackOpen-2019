import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const create = async person => {
  try {
    const res = await axios.post(baseUrl, person);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const remove = async id => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const update = async (id, person) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, person);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default { getAll, create, remove, update };
