/************ Update: Schemas ***************/

/* Add Schema: sch_document */
CREATE SCHEMA sch_document;

/* Add Schema: sch_project */
CREATE SCHEMA sch_project;

/* Add Schema: sch_user */
CREATE SCHEMA sch_user;



/************ Update: Tables ***************/

/******************** Add Table: sch_document.tbl_document ************************/

/* Build Table Structure */
CREATE TABLE sch_document.tbl_document
(
	id UUID NOT NULL,
	code VARCHAR(10) NOT NULL,
	name VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	points INTEGER NULL,
	content TEXT NULL,
	"projectId" UUID NULL,
	"fatherDocumentId" UUID NULL,
	"typeId" UUID NULL,
	"stateId" UUID NULL
);

/* Add Primary Key */
ALTER TABLE sch_document.tbl_document ADD CONSTRAINT pktbl_document
	PRIMARY KEY (id);

/* Add Indexes */
CREATE INDEX "tbl_document_code_Idx" ON sch_document.tbl_document (code);

CREATE INDEX "tbl_document_id_Idx" ON sch_document.tbl_document (id);

CREATE INDEX "tbl_document_name_Idx" ON sch_document.tbl_document (name);


/******************** Add Table: sch_document.tbl_state ************************/

/* Build Table Structure */
CREATE TABLE sch_document.tbl_state
(
	id UUID NOT NULL,
	name VARCHAR(60) NOT NULL,
	icon VARCHAR(20) NULL,
	color VARCHAR(7) NULL
);

/* Add Primary Key */
ALTER TABLE sch_document.tbl_state ADD CONSTRAINT pktbl_state
	PRIMARY KEY (id);

/* Add Indexes */
CREATE INDEX "tbl_state_id_Idx" ON sch_document.tbl_state (id);


/******************** Add Table: sch_document.tbl_type ************************/

/* Build Table Structure */
CREATE TABLE sch_document.tbl_type
(
	id UUID NOT NULL,
	name VARCHAR(60) NOT NULL,
	icon VARCHAR(20) NULL
);

/* Add Primary Key */
ALTER TABLE sch_document.tbl_type ADD CONSTRAINT pktbl_type
	PRIMARY KEY (id);

/* Add Indexes */
CREATE INDEX "tbl_type_id_Idx" ON sch_document.tbl_type (id);


/******************** Add Table: sch_project.tbl_project ************************/

/* Build Table Structure */
CREATE TABLE sch_project.tbl_project
(
	id UUID NOT NULL,
	code VARCHAR(8) NOT NULL,
	name VARCHAR(60) NOT NULL
);

/* Add Primary Key */
ALTER TABLE sch_project.tbl_project ADD CONSTRAINT pktbl_project
	PRIMARY KEY (id);

/* Add Indexes */
CREATE INDEX "tbl_project_code_Idx" ON sch_project.tbl_project (code);

CREATE INDEX "tbl_project_id_Idx" ON sch_project.tbl_project (id);

CREATE INDEX "tbl_project_name_Idx" ON sch_project.tbl_project (name);


/******************** Add Table: sch_user.tbl_user ************************/

/* Build Table Structure */
CREATE TABLE sch_user.tbl_user
(
	id UUID NOT NULL,
	name VARCHAR(60) NOT NULL,
	password VARCHAR(40) NOT NULL,
	email VARCHAR(255) NOT NULL
);

/* Add Primary Key */
ALTER TABLE sch_user.tbl_user ADD CONSTRAINT pktbl_user
	PRIMARY KEY (id);


/************ Add Foreign Keys ***************/

/* Add Foreign Key: fk_tbl_document_tbl_document */
ALTER TABLE sch_document.tbl_document ADD CONSTRAINT fk_tbl_document_tbl_document
	FOREIGN KEY ("fatherDocumentId") REFERENCES sch_document.tbl_document (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_tbl_document_tbl_project */
ALTER TABLE sch_document.tbl_document ADD CONSTRAINT fk_tbl_document_tbl_project
	FOREIGN KEY ("projectId") REFERENCES sch_project.tbl_project (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_tbl_document_tbl_state */
ALTER TABLE sch_document.tbl_document ADD CONSTRAINT fk_tbl_document_tbl_state
	FOREIGN KEY ("stateId") REFERENCES sch_document.tbl_state (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_tbl_document_tbl_type */
ALTER TABLE sch_document.tbl_document ADD CONSTRAINT fk_tbl_document_tbl_type
	FOREIGN KEY ("typeId") REFERENCES sch_document.tbl_type (id)
	ON UPDATE NO ACTION ON DELETE NO ACTION;
