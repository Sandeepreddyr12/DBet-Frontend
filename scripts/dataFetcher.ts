const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');

const fs = require('fs');

const firebaseConfig = require('./dBetFirebasePrivateKeys.json');


initializeApp({
  credential: cert(firebaseConfig),
});


const db = getFirestore();

async function getDocument() {
  // [START firestore_data_get_as_map]
  const contestsRef = db.collection("moralis/events/Allcontests");
  const doc = await contestsRef.get();

  // console.log(doc);

 

  if (doc.empty) {
    console.log('No such document!');
    
  } else {

    console.log('from else');

    let allData: any[] = [];
    doc.forEach((doc: { id: any; data: () => any; }) => {
      allData.push(doc.data());
    });
    fs.writeFile(
      `${__dirname}/DBdata.json`,
      JSON.stringify(allData, null, 2),
      (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data written to file successfully');
      }
    );

    
  }
  
}

getDocument();
