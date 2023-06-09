const admin = require('firebase-admin');
const serviceAccount = require('../serviceaccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/plated-ensign-382707/firestore/rules'
});

const db = admin.firestore();
const bucket = admin.storage().bucket('aboutpet-peliharain');

const getArticleDog = async (request, h) => {
  try {
    const dogId = request.params.id;

    const docRef = db.collection('Dog').doc(dogId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return h.response('File not found').code(404);
    }

    const dogData = doc.data();

    const imageUrl = await getDownloadUrl(dogData.Image);

    dogData.imageUrl = imageUrl;

    return h.response(dogData);
  } 
  
  catch (error) {
    console.error(error);
    return h.response('Eror').code(500);
  }
};

const getallArticleDog = async (request, h) => {
  try {
    const snapshot = await db.collection('Dog').get();
    const dogs = [];

    snapshot.forEach(async (doc) => {
      const dogData = doc.data();

      const imageUrl = await getDownloadUrl(dogData.Image);

      dogData.imageUrl = imageUrl;

      dogs.push(dogData);
    });
    return h.response(dogs);
  } 
  
  catch (error) 
  {
    console.error(error);
    return h.response('Error retrieving dogs').code(500);
  }
};

const addArticleDog = async (request, h) => {
  try {
    const { Publisher, Title, Content, Image } = request.payload;

    const dogId = db.collection('Dog').doc().id;

    const imagePath = `Dog/${Image.hapi.filename}`;

    const fileUploadStream = bucket.file(imagePath).createWriteStream({
      metadata: {
        contentType: Image.hapi.headers['content-type']
      }
    });

    Image.pipe(fileUploadStream);

    await new Promise((resolve, reject) => {
      fileUploadStream.on('finish', resolve);
      fileUploadStream.on('error', reject);
    });

    await db.collection('Dog').doc(dogId).set({
      Publisher,
      Title,
      Content,
      Image: imagePath
    });

    // Return the success response
    return h.response({ message: 'Dog added successfully' }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ message: 'Error adding dog' }).code(500);
  }
};

const editArticleDog = (request, h) => {
  const id = parseInt(request.params.idDog);
  const { content } = request.payload;
  const articleIndex = articlesDog.findIndex((a) => a.idDog === id);

  if (articleIndex === -1) {
    return h.response({ message: "Article not found" }).code(404);
  }

  articlesDog[articleIndex] = { idDog, content };
  return h.response(articlesDog[articleIndex]).code(200);
};

const deleteArticleDog = (request, h) => {
  const id = parseInt(request.params.idDog);
  const articleIndex = articlesDog.findIndex((a) => a.id === id);

  if (articleIndex === -1) {
    return h.response({ message: "Article not found" }).code(404);
  }

  const deletedArticle = articlesDog.splice(articleIndex, 1)[0];
  return h.response(deletedArticle).code(200);
};

const deleteallArticleDog = (request, h) => {
  articlesDog = [];
  return h.response({ message: "All articles deleted" }).code(200);
};

////=============== Split Beetween Dog and Cat ===============////

const getArticleCat = async (request, h) => {
  try {
    const catId = request.params.id;

    const docRef = db.collection('Cat').doc(catId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return h.response('File not found').code(404);
    }

    const catData = doc.data();

    const imageUrl = await getDownloadUrl(catData.Image);

    catData.imageUrl = imageUrl;

    return h.response(catData);
  } 
  
  catch (error) {
    console.error(error);
    return h.response('Eror').code(500);
  }
};

const getallArticleCat = async (request, h) => {
  try {
    const snapshot = await db.collection('Cat').get();
    const cats = [];

    snapshot.forEach(async (doc) => {
      const catData = doc.data();

      const imageUrl = await getDownloadUrl(catData.Image);

      catData.imageUrl = imageUrl;

      cats.push(catData);
    });
    return h.response(cats);
  } 
  
  catch (error) 
  {
    console.error(error);
    return h.response('Error retrieving dogs').code(500);
  }
};

const addArticleCat = (request, h) => {
  const { content } = request.payload;
  const newArticle = { idCat: articles.length + 1, content };
  articlesCat.push(newArticle);
  return h.response(newArticle).code(201);
};

const editArticleCat = (request, h) => {
  const id = parseInt(request.params.idCat);
  const { content } = request.payload;
  const articleIndex = articlesCat.findIndex((a) => a.idCat === id);

  if (articleIndex === -1) {
    return h.response({ message: "Article not found" }).code(404);
  }

  articlesCat[articleIndex] = { idCat, content };
  return h.response(articlesCat[articleIndex]).code(200);
};

const deleteArticleCat = (request, h) => {
  const id = parseInt(request.params.idCat);
  const articleIndex = articlesCat.findIndex((a) => a.id === id);

  if (articleIndex === -1) {
    return h.response({ message: "Article not found" }).code(404);
  }

  const deletedArticle = articlesCat.splice(articleIndex, 1)[0];
  return h.response(deletedArticle).code(200);
};

const deleteallArticleCat = (request, h) => {
  articlesCat = [];
  return h.response({ message: "All articles deleted" }).code(200);
};

const getDownloadUrl = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    throw new Error('Failed to get download URL');
  }
};

const UploadImage = async () => {
  const file = request.payload.image;

  if (!file) {
    throw new Error('No file uploaded.');
  }

  const blob = storage.bucket(bucketName).file(`Dog/${file.hapi.filename}`);

  // Buat writable stream dan unggah file ke Firebase Storage
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.hapi.headers['content-type']
    }
  });

  blobStream.on('error', (err) => {
    console.error(err);
    throw new Error('Error uploading file.');
  });

  blobStream.on('finish', () => {
    return 'File uploaded successfully.';
  });

  file.pipe(blobStream);

  return h.response(file.hapi.filename).code(200);
}

module.exports = {
  getArticleDog,
  getallArticleDog,
  addArticleDog,
  editArticleDog,
  deleteArticleDog,
  deleteallArticleDog,

  getArticleCat,
  getallArticleCat,
  addArticleCat,
  editArticleCat,
  deleteArticleCat,
  deleteallArticleCat,
};
