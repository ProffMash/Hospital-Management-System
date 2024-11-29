// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/', 
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// export default axiosInstance;



import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
};

fetchData();
