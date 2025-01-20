import admin from "firebase-admin";

function initializeFirebase() {
  try {
    if (!admin.apps.length) {
      if (!process.env.FIREBASE_ADMINSDK) {
        throw new Error("FIREBASE_ADMINSDK environment variable is not set");
      }

      let serviceAccount;
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK);

        // Fix the private key formatting
        if (serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key
            .replace(/\\n/g, "\n")
            .replace(/"/g, "");
        }
      } catch (parseError) {
        console.error("Error parsing FIREBASE_ADMINSDK:", parseError);
        throw new Error(
          "Failed to parse FIREBASE_ADMINSDK environment variable"
        );
      }

      // Validate required fields
      const requiredFields = ["project_id", "private_key", "client_email"];
      for (const field of requiredFields) {
        if (!serviceAccount[field]) {
          throw new Error(
            `Missing required field in service account: ${field}`
          );
        }
      }

      // Initialize the app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      // console.log('Firebase Admin initialized successfully');
    }
    return admin.firestore();
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw error;
  }
}
// Initialize Firebase and get Firestore instance
const db = initializeFirebase();

export { db };
