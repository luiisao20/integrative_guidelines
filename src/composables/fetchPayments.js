import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/main.js';

const monthMap = {
    ene: 0, 
    feb: 1,
    mar: 2, 
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sept:8,
    oct: 9,
    nov: 10,
    dic: 11
};

async function fetchPayments(id) {
    let payments = [];
    const q = query(collection(db, 'payments'), where('owner', '==', `${id}`))
    const querySnapshot = await getDocs(q);

    payments = [ ...querySnapshot.docs ];

    payments.sort((a, b) => {
        const [dayA, monthA, yearA] = a.data().date.split(' ');
        const [dayB, monthB, yearB] = b.data().date.split(' ');

        const formattedDateA = new Date(Date.UTC(yearA, monthMap[monthA.toLowerCase()], dayA));
        const formattedDateB = new Date(Date.UTC(yearB, monthMap[monthB.toLowerCase()], dayB));
    
        return formattedDateB - formattedDateA;
    })

    return payments
}

export { fetchPayments }