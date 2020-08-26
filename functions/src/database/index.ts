import admin from 'firebase-admin'

import serviceAccount from '../../secret/calebServiceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert((serviceAccount as unknown) as string),
  databaseURL: 'https://caleb-97b50.firebaseio.com/',
})

const db = admin.database()

export default db
