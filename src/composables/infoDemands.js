import { doc, getDoc } from "firebase/firestore";
import { db } from "../main";

async function getInfoContent(code) {
    const infoRef = doc(db, 'infoguides', `${code}`);
    const docSnap = await getDoc(infoRef);
    if (code === 'consent') return docSnap.data()
    else return docSnap.data().info
}

export { getInfoContent }