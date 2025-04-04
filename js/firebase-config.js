import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig2 = {

};

const app2 = initializeApp(firebaseConfig2);
const db2 = getFirestore(app2);

export { db2, collection, getDocs };


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig3 = {

};

const app3 = initializeApp(firebaseConfig3);
const db3 = getFirestore(app3);

export { db3, collection, getDocs };