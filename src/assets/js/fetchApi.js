const fetchApi = url => {
    return fetch(url, {
        headers: {"X-Auth-Token": "ebf49b2fe09940628ae59c1c6599d33c"}
    });
};

export default fetchApi;