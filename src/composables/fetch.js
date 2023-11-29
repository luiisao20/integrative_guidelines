import { ref } from 'vue';
import axios from 'axios';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';

async function useFetch(guide, id, processid) {
    const data = ref(null);
    const error = ref(null);

    const guideRef = collection(db, `${guide}`);
    const q = query(guideRef, where('patient', '==', `${id}`), where('process', '==', `${processid}`));

    const querySnapshot = await getDocs(q);
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