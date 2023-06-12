const admin = require("firebase-admin");
const serviceAccount = require("../serviceaccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/project/plated-ensign-382707/firestore/rules",
});

const db = admin.firestore();
const bucket = admin.storage().bucket("aboutpet-peliharain");

const getArticleDog = async (request, h) => {
  try {
    const dogId = request.params.id;

    const docRef = db.collection("Dog").doc(dogId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return h.response("File tidak ditemukan").code(404);
    }

    const dogData = doc.data();

    const imageUrl = await getDownloadUrl(dogData.Image);

    dogData.imageUrl = imageUrl;

    return h.response(dogData);
  } catch (error) {
    console.error(error);
    return h.response("Eror").code(500);
  }
};

const getallArticleDog = async (request, h) => {
  try {
    const snapshot = await db.collection("Dog").get();
    const dogs = [];

    snapshot.forEach(async (doc) => {
      const dogData = doc.data();

      const imageUrl = await getDownloadUrl(dogData.Image);

      dogData.imageUrl = imageUrl;

      dogs.push(dogData);
    });
    return h.response(dogs);
  } catch (error) {
    console.error(error);
    return h.response("Artikel tidak dapat ditemukan").code(500);
  }
};

////=============== Split Beetween Dog and Cat ===============////

const getArticleCat = async (request, h) => {
  try {
    const catId = request.params.id;

    const docRef = db.collection("Cat").doc(catId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return h.response("File tidak ditemukan").code(404);
    }

    const catData = doc.data();

    const imageUrl = await getDownloadUrl(catData.Image);

    catData.imageUrl = imageUrl;

    return h.response(catData);
  } catch (error) {
    console.error(error);
    return h.response("Eror").code(500);
  }
};

const getallArticleCat = async (request, h) => {
  try {
    const snapshot = await db.collection("Cat").get();
    const cats = [];

    snapshot.forEach(async (doc) => {
      const catData = doc.data();

      const imageUrl = await getDownloadUrl(catData.Image);

      catData.imageUrl = imageUrl;

      cats.push(catData);
    });
    return h.response(cats);
  } catch (error) {
    console.error(error);
    return h.response("Artikel tidak dapat ditemukan").code(500);
  }
};

const getDownloadUrl = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });
    return url;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw new Error("Failed to get download URL");
  }
};

module.exports = {
  getArticleDog,
  getallArticleDog,
  getArticleCat,
  getallArticleCat,
};
