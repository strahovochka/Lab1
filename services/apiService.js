const BASE_URL = "https://65fb023614650eb210090f3f.mockapi.io/";
const ENDPOINT = "currencies";

function getAll() {
  return axios.get(`${BASE_URL}/${ENDPOINT}`).then(({ data }) => data);
}

function addNewSelection(selections) {
  return axios.post(`${BASE_URL}/${ENDPOINT}`, selections);
}

export default { getAll, addNewSelection };
