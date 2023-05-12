import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34651867-a9ff37d4e5e76304c6c99ac31';

async function fetchImages(query, page) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error.message);
    } 
}
    
const api = {
    fetchImages,
};

export default api;
  
  