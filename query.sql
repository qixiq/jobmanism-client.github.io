CREATE TABLE EvidenceTypes
(
	EvidenceTypeId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(64) NOT NULL,
	Description VARCHAR(1024) NOT NULL,
	Specification VARBINARY(max)
);

CREATE TABLE ServiceCategoryEvidenceRequirements
(
	ServiceCategoryId BIGINT NOT NULL,
	EvidenceTypeId BIGINT NOT NULL,
	Mandatory INT NOT NULL,
	CONSTRAINT FK_SvcCatEvidence_ServiceCategoryId FOREIGN KEY (ServiceCategoryId)
        REFERENCES [dbo].[ServiceCategories] (ServiceCategoryId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_SvcCatEvidence_EvidenceTypeId FOREIGN KEY (EvidenceTypeId)
        REFERENCES [dbo].[EvidenceTypes] (EvidenceTypeId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_ServiceCategoryEvidenceRequirements
  ON [dbo].[ServiceCategoryEvidenceRequirements](ServiceCategoryId, EvidenceTypeId);

CREATE TABLE VettingEvidenceForServiceCategoryRegistration
(
	UserId BIGINT NOT NULL,
	ServiceCategoryId BIGINT NOT NULL,
	EvidenceTypeId BIGINT NOT NULL,
	ResourceId BIGINT
);

CREATE UNIQUE INDEX uq_VettingEvidenceForServiceCategoryRegistration
  ON [dbo].[VettingEvidenceForServiceCategoryRegistration](UserId, ServiceCategoryId, EvidenceTypeId);

CREATE TABLE WarrantyRemedies
(
	WarrantyRemedyId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(64) NOT NULL,
	Description VARCHAR(1024) NOT NULL,
	Specification VARBINARY(max)
);

CREATE TABLE CoveredItems
(
	CoveredItemId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(64) NOT NULL,
	Description VARCHAR(1024) NOT NULL 
);

CREATE TABLE ServiceCategoryCoveredItems
(
	ServiceCategoryId BIGINT NOT NULL,
	CoveredItemId BIGINT NOT NULL, 
	CONSTRAINT FK_SvcCatCoveredItems_ServiceCategoryId FOREIGN KEY (ServiceCategoryId)
        REFERENCES [dbo].[ServiceCategories] (ServiceCategoryId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_SvcCatCoveredItems_CoveredItemId FOREIGN KEY (CoveredItemId)
        REFERENCES [dbo].[CoveredItems] (CoveredItemId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_ServiceCategoryCoveredItems
  ON [dbo].[ServiceCategoryCoveredItems](ServiceCategoryId, CoveredItemId);

CREATE TABLE CoveredItemWarrantyRemedies
(
	WarrantyRemedyId BIGINT NOT NULL,
	CoveredItemId BIGINT NOT NULL, 
	CONSTRAINT FK_CoveredItemsWarrantyRemedy_WarrantyRemedyId FOREIGN KEY (WarrantyRemedyId)
        REFERENCES [dbo].[WarrantyRemedies] (WarrantyRemedyId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_SvcCatCoveredItems_CoveredItemId FOREIGN KEY (CoveredItemId)
        REFERENCES [dbo].[CoveredItems] (CoveredItemId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_CoveredItemWarrantyRemedies
  ON [dbo].[CoveredItemWarrantyRemedies](WarrantyRemedyId, CoveredItemId);



