CREATE TABLE EvidenceTypes
(
	EvidenceTypeId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(64) UNIQUE NOT NULL,
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
	ResourceId BIGINT,
    Status INT NOT NULL
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

CREATE TABLE UserGroups
(
    GroupId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(128) NOT NULL UNIQUE,
    Description VARCHAR(1024) NOT NULL
);

CREATE TABLE UserGroupMembers
(
	UserId BIGINT NOT NULL,
	GroupId BIGINT NOT NULL, 
	CONSTRAINT FK_UserGroupMembers_UserId FOREIGN KEY (UserId)
        REFERENCES [dbo].[UserProfiles] (UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_UserGroupMembers_GroupId FOREIGN KEY (GroupId)
        REFERENCES [dbo].[UserGroups] (GroupId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_UserGroupMembers
  ON [dbo].[UserGroupMembers](UserId, GroupId);

 CREATE TABLE GroupGroupMembers
(
	ChildGroupId BIGINT NOT NULL,
	ParentGroupId BIGINT NOT NULL, 
	CONSTRAINT FK_GroupGroupMembers_ChildGroupId FOREIGN KEY (ChildGroupId)
        REFERENCES [dbo].[UserGroups] (GroupId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_GroupGroupMembers
  ON [dbo].[GroupGroupMembers](ChildGroupId, ParentGroupId);

CREATE TABLE Permissions
(
	PermissionId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(64) NOT NULL,
	Description VARCHAR(1024) NOT NULL,
	Specification VARBINARY(max)
);


CREATE TABLE UserPermissions
(
	UserId BIGINT NOT NULL,
        MethodId BIGINT NOT NULL,
	PermissionId BIGINT NOT NULL, 
	CONSTRAINT FK_UserPermissions_UserId FOREIGN KEY (UserId)
        REFERENCES [dbo].[UserProfiles] (UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_UserPermissions_PermissionId FOREIGN KEY (PermissionId)
        REFERENCES [dbo].[Permissions] (PermissionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_UserPermissions
  ON [dbo].[UserPermissions](UserId, MethodId, PermissionId);

 CREATE TABLE GroupPermissions
(
	GroupId BIGINT NOT NULL,
        MethodId BIGINT NOT NULL,
	PermissionId BIGINT NOT NULL, 
	CONSTRAINT FK_GroupPermissions_GroupId FOREIGN KEY (GroupId)
        REFERENCES [dbo].[UserGroups] (GroupId)
        ON DELETE CASCADE
        ON UPDATE CASCADE, 
	CONSTRAINT FK_GroupPermissions_PermissionId FOREIGN KEY (PermissionId)
        REFERENCES [dbo].[Permissions] (PermissionId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_GroupPermissions
  ON [dbo].[GroupPermissions](GroupId, MethodId, PermissionId);

CREATE TABLE ServiceCategoryAnnotations
(
  ServiceCategoryAnnotationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  ServiceCategoryId BIGINT NOT NULL,
  ResourceId BIGINT,
  Sequence INT NOT NULL,
  Comment VARCHAR(1024),
  CONSTRAINT FK_ServiceCategoryAnnotations_ServiceCategoryId FOREIGN KEY (ServiceCategoryId)
  REFERENCES [dbo].[ServiceCategories] (ServiceCategoryId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_ServiceCategoryAnnotations_ResourceId FOREIGN KEY (ResourceId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_ServiceCategoryAnnotationsResources
  ON [dbo].[ServiceCategoryAnnotations](ServiceCategoryId, ResourceId);

  CREATE UNIQUE INDEX uq_ServiceCategoryAnnotationsSequences
  ON [dbo].[ServiceCategoryAnnotations](ServiceCategoryId, Sequence);

CREATE TABLE JobRequisitions
(
  JobRequisitionId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  UserId BIGINT NOT NULL,
  ServiceCategoryId BIGINT NOT NULL,
  SummaryOfWork VARCHAR(max) NOT NULL,
  Title VARCHAR(256) NOT NULL,
  AddressId BIGINT NOT NULL,
  PhoneNumberId BIGINT NOT NULL,
  Published INT NOT NULL DEFAULT 0,
  CONSTRAINT FK_JobRequisitions_ServiceCategoryId FOREIGN KEY (ServiceCategoryId)
  REFERENCES [dbo].[ServiceCategories] (ServiceCategoryId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_JobRequisitions_UserId FOREIGN KEY (UserId)
  REFERENCES [dbo].[UserProfiles] (UserId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_JobRequisitions_AddressId FOREIGN KEY (AddressId)
  REFERENCES [dbo].[Addresses] (AddressId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_JobRequisitions_PhoneNumberId FOREIGN KEY (PhoneNumberId)
  REFERENCES [dbo].[PhoneNumbers] (PhoneNumberId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

  CREATE UNIQUE INDEX uq_JobRequisitions
  ON [dbo].[JobRequisitions](UserId, Title);


CREATE TABLE JobRequisitionAnnotations
(
  JobRequisitionAnnotationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  JobRequisitionId BIGINT NOT NULL,
  ResourceId BIGINT NOT NULL,
  Sequence INT NOT NULL,
  Comment VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_JobRequisitionAnnotations_JobRequisitionId FOREIGN KEY (JobRequisitionId)
  REFERENCES [dbo].[JobRequisitions] (JobRequisitionId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_JobRequisitionAnnotations_ResourceId FOREIGN KEY (ResourceId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_JobRequisitionAnnotationsResources
  ON [dbo].[JobRequisitionAnnotations](JobRequisitionId, ResourceId);

CREATE UNIQUE INDEX uq_JobRequisitionAnnotationsSequences
  ON [dbo].[JobRequisitionAnnotations](JobRequisitionId, Sequence);

CREATE TABLE JobRequisitionConstraints
(
  JobRequisitionConstraintId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  JobRequisitionId BIGINT NOT NULL,
  JobConstraint VARCHAR(max) NOT NULL,
  CONSTRAINT FK_PublishedJobRequisitions_JobRequisitionId FOREIGN KEY (JobRequisitionId)
  REFERENCES [dbo].[JobRequisitions] (JobRequisitionId)
  ON DELETE CASCADE
  ON UPDATE CASCADE 
);





