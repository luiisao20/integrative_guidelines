import { ref } from 'vue';
import axios from 'axios';

async function useFetch(urlapi) {
    const data = ref(null);
    const error = ref(null);

    try {
        const res = await axios.get(`http://localhost:3000/${urlapi}`);
        data.value = res.data;
    } catch (error) {
        error.value = error;
    }

    return {
        data, error
    }
}

export { useFetch }