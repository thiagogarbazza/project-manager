let logger = require('../logger.js');
let _ = require('lodash');

module.exports = app => {
  const Projects = app.domain.project.Projects;
  const Documents = app.domain.document.Documents;
  const DocumentStatus = app.domain.document.DocumentStatus;
  const DocumentTypes = app.domain.document.DocumentTypes;

  const sequelize = app.sequelize;

  const projectAudint = {
    "code": "AUDINT",
    "name": "Software Auditoria interna"
  };

  const docTypes = [
    {
      "code": "CLEAN",
      "name": "Clean"
    },
    {
      "code": "US",
      "name": "User Story",
      "icon": "fa fa-file-text-o"
    }
  ];

  const docStatus = [
    {
      "code": "EC",
      "name": "Em Construção",
      "color": "gray"
    },
    {
      "code": "APT",
      "name": "Aguardando aprovação texto",
      "color": "yellow"
    }
  ];


  app.route("/service/init-data")
  //.all(app.auth.authenticate())

  .get((req, res) => {
    Projects.findAll({where: {code: projectAudint.code}}).then(result => {
      if (!_.isEmpty(result)) {
        logger.info('# Database initilized.');
        res.status(200).json(result);
      } else {
        logger.info('# Initializing database.');
        Projects.create(projectAudint);
        docStatus.forEach(status => {DocumentStatus.create(status)});
        docTypes.forEach(type => {DocumentTypes.create(type)});
        res.status(200).json({data: "create"});
      }

    });
  });

}
