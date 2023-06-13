const admin = require("firebase-admin");
const serviceAccount = require("../serviceaccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/project/pelihara-in-389202/firestore/rules",
});

const db = admin.firestore();
const bucket = admin.storage().bucket("pelihara-in-389202.appspot.com");

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

const addArticleDog = async (request, h) => {
  try {
    const { payload } = request;
    const { title, file, content, publisher, iddog } = payload;

    const imageUrl = await uploadFileDog(file);

    const dogData = {
      Title: title,
      Content: content,
      Publisher: publisher,
      idDog: iddog,
      Image: imageUrl,
    };

    const docRef = await db.collection("Dog").add(dogData);
    const dogId = docRef.id;

    const addedDog = await docRef.get();
    const dogDataWithId = addedDog.data();
    dogDataWithId.id = dogId;

    return h.response(dogDataWithId).code(201);
  } catch (error) {
    console.error(error);
    return h.response("Error").code(500);
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

const addArticleCat = async (request, h) => {
  try {
    const { payload } = request;
    const { title, file, content, publisher, idcat } = payload;

    const imageUrl = await uploadFileCat(file);

    const catData = {
      Title: title,
      Content: content,
      Publisher: publisher,
      idCat: idcat,
      Image: imageUrl,
    };

    const docRef = await db.collection("Cat").add(catData);
    const catId = docRef.id;

    const addedCat = await docRef.get();
    const catDataWithId = addedCat.data();
    catDataWithId.id = catId;

    return h.response(catDataWithId).code(201);
  } catch (error) {
    console.error(error);
    return h.response("Error").code(500);
  }
};

////=============== Upload and Download Image ===============////

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

const uploadFileCat = async (file) => {
  const filePath = file.path;
  const fileExt = path.extname(filePath);

  const originalFileName = path.basename(file.path);

  const fileName = `${originalFileName}${fileExt}`;

  const options = {
    destination: `Cat/${fileName}`,
    public: true,
    metadata: {
      contentType: file.headers["content-type"],
    },
  };

  await bucket.upload(filePath, options);

  const imageUrl = `Cat/${fileName}`;
  console.log("File uploaded successfully. Image URL:", imageUrl);

  return imageUrl;
};

const uploadFileDog = async (file) => {
  const filePath = file.path;
  const fileExt = path.extname(filePath);

  const originalFileName = path.basename(file.path);

  const fileName = `${originalFileName}${fileExt}`;

  const options = {
    destination: `Dog/${fileName}`,
    public: true,
    metadata: {
      contentType: file.headers["content-type"],
    },
  };

  await bucket.upload(filePath, options);

  const imageUrl = `Dog/${fileName}`;
  console.log("File uploaded successfully. Image URL:", imageUrl);

  return imageUrl;
};

module.exports = {
  getArticleDog,
  getallArticleDog,
  addArticleDog,
  getArticleCat,
  getallArticleCat,
  addArticleCat,
};
