import * as functions from 'firebase-functions'
import expressApp from './app'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const app = functions.https.onRequest(expressApp)
