export default {
  fetchRequest: (url, options) => {
    return fetch(url, options)
      .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  },
};
