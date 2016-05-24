let path = require("path");
let glob = require("glob");
let logger = require("../logger");

const ROOT_PATH = path.join(__dirname, "../domain/");


function findPackage(root, path) {
  let parts = path.split(".");
  if (parts.length==1){
    return root[parts[0]];
  }
  return findPackage(root[parts[0]], parts.slice(1).join("."));
}

function createPackage(root, packagePath){
  let current = root;
  let path = packagePath.split('.');
  let pathLength=path.length;

  for (let i=0; i < pathLength; i++){
    let currentPath = path[i];

    if (current[currentPath]) {
      current = current[currentPath];
    } else {
      current[currentPath] = {}
    }
  };// fim forEach
  return current;
};

// app.domain.document.Documents.tableName
function runAssociates(root, domain) {
  Object.keys(root).forEach( (key) => {
    let current = root[key];
    if (current && current.tableName && current.associate) {
      current.associate(domain);
    } else if(current && !current.tableName){
      runAssociates(current, domain);
    }
  });
}

module.exports = app => {
  if(!app.domain) {
    app.domain = {};
    const sequelize = app.sequelize;
    const modelFiles = path.join(ROOT_PATH, "**/*-model.js");

    glob.sync(modelFiles, {}).forEach((modelFile, index) => {
      const packagePath = modelFile.replace(ROOT_PATH, '').split("/").filter((package) => {
        return !package.endsWith('-model.js');
      }).toString().replace(',', '.');
      createPackage(app.domain, packagePath);

      const model = sequelize.import(modelFile);

      findPackage(app.domain, packagePath)[model.name] = model;
      logger.info('Loading the model:', model.name, 'in ', packagePath);
    });

    runAssociates(app.domain, app.domain);
  }
};
