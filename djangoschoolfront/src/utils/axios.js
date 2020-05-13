import axios from "axios";

const token = localStorage.getItem("token");

export const get = async (endpoint) => {
    const headers = { headers: { Authorization: `Token ${token}` } };
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    let resolveReturn, rejectReturn;
    const promise = new Promise((resolve, reject) => {
      resolveReturn = resolve;
      rejectReturn = reject;
    })
    try {
        const resp = await axios.get(url, headers);
        resolveReturn(resp)
    } catch (error) {
        rejectReturn(error)
    }
    return promise
}