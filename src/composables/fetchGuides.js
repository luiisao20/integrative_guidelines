import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';

async function fetchGuide (guide, id, processid) {

    let data = null;
    let go = false;
    const guideRef = collection(db, `${guide}`);

    const q = query(guideRef, where('patient', '==', `${id}`), where('process', '==', `${processid}`));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        go = true;
        data = querySnapshot.docs[0];
    }

    return { data, go }
}

export { fetchGuide }