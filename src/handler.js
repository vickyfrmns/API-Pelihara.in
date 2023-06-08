const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "plated-ensign-382707",
  keyFilename: "../serviceaccountkey.json"
});

let articlesDog = [
  {
    idDog: 1,
    title: "Title/Trouble Bab 6.txt",
    publisher: "Publisher/To-Do.txt",
    content: "Content/Tuning Kecepatan Kanan.txt",
    imageFile: "Untitled2",
  },
];

const getArticleDog = async (request, h) => {
  const id = parseInt(request.params.idDog);
  const article = articlesDog.find((a) => a.idDog === id);

  if (!article) {
    return h.response({ message: "Article not found" }).code(404);
  }

  const { title, publisher, content, imageFile } = article;

  const titleFile = storage.bucket("aboutpet-peliharain").file(title);
  const [titleText] = await titleFile.download();

  const publisherFile = storage.bucket("aboutpet-peliharain").file(publisher);
  const [publisherText] = await publisherFile.download();

  const contentFile = storage.bucket("aboutpet-peliharain").file(content);
  const [contentText] = await contentFile.download();

  const imageFileObj = storage.bucket("aboutpet-peliharain").file(imageFile);
  const [imageUrl] = await imageFileObj.getSignedUrl({
    action: "read",
    expires: "12-12-2030",
  });

  return h
    .response({
      ...article,
      title: titleText.toString(),
      publisher: publisherText.toString(),
      content: contentText.toString(),
      imageUrl
    })
    .code(200);
};

const getallArticleDog = (request, h) => {
  return h.response(articlesDog).code(200);
};

const addArticleDog = async (request, h) => {
  try {
    const { content, title } = request.payload;
    const newArticle = { idDog: articles.length + 1, title, content1 };

    const fileName = "article_dog_${dnegksgskpos}.txt";
    await storage
      .bucket(bucketName)
      .file(fileName)
      .save(JSON.stringify(newArticle));
    return h.response(newArticle).code(201);
  } catch (error) {
    console.error("Error cuy", error);
    return h.response({ message: "Failed to add article" }).code(500);
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

let articlesCat = [
  { idCat: 1, content: "Oke Test" },
  { idCat: 2, content: "Hallo cat" },
];

const getArticleCat = (request, h) => {
  const id = parseInt(request.params.idCat);
  const article = articlesCat.find((a) => a.idCat === id);

  if (!article) {
    return h.response({ message: "Article not found" }).code(404);
  }

  return h.response(article).code(200);
};

const getallArticleCat = (request, h) => {
  return h.response(articlesCat).code(200);
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
