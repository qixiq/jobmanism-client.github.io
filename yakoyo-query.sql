CREATE TABLE Businesses
(
	BusinessId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  CreatorId BIGINT NOT NULL,
	Name VARCHAR(128) UNIQUE NOT NULL,
	Description VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_Businesses_CreatorId FOREIGN KEY (CreatorId)
  REFERENCES [dbo].[UserProfiles] (UserId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE BusinessLocations
(
  LocationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  BusinessId BIGINT NOT NULL,
  AddressId BIGINT NOT NULL,
  PrimaryPhoneNumberId BIGINT NOT NULL,
  CONSTRAINT FK_BusinessLocations_BusinessId FOREIGN KEY (BusinessId)
  REFERENCES [dbo].[Businesses] (BusinessId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_BusinessLocations_AddressId FOREIGN KEY (AddressId)
  REFERENCES [dbo].[Addresses] (AddressId)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT FK_BusinessLocations_PrimaryPhoneNumberId FOREIGN KEY (PrimaryPhoneNumberId)
  REFERENCES [dbo].[PhoneNumbers] (PhoneNumberId)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
);

CREATE TABLE FoodAndDrinkVendorTypes
(
   VendorTypeId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   Name VARCHAR(255) NOT NULL UNIQUE,
   Description VARCHAR(1024) NOT NULL
);

CREATE TABLE FoodAndDrinkVendorLocations
(
   VendorTypeId BIGINT NOT NULL,
   LocationId BIGINT NOT NULL,
  CONSTRAINT FK_FoodAndDrinkVendorLocations_VendorTypeId FOREIGN KEY (VendorTypeId)
  REFERENCES [dbo].[FoodAndDrinkVendorTypes] (VendorTypeId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_FoodAndDrinkVendorLocations_LocationId FOREIGN KEY (LocationId)
  REFERENCES [dbo].[BusinessLocations] (LocationId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_FoodAndDrinkVendorLocations
  ON [dbo].[FoodAndDrinkVendorLocations](VendorTypeId, LocationId);

CREATE TABLE MenuItemCategories
(
   MenuItemCategoryId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   Name VARCHAR(255) NOT NULL UNIQUE,
   Description VARCHAR(1024) NOT NULL
);

CREATE TABLE MenuItems
(
   MenuItemId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   BusinessId BIGINT NOT NULL,
   MenuItemCategoryId BIGINT NOT NULL, 
   Name VARCHAR(255) NOT NULL,
   Description VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_MenuItems_MenuItemCategoryId FOREIGN KEY (MenuItemCategoryId)
  REFERENCES [dbo].[MenuItemCategories] (MenuItemCategoryId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_MenuItems_BusinessId FOREIGN KEY (BusinessId)
  REFERENCES [dbo].[Businesses] (BusinessId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_MenuItems
  ON [dbo].[MenuItems](MenuItemCategoryId, BusinessId, Name);


CREATE TABLE LocationMenuItems
(
   MenuItemId BIGINT NOT NULL,
   LocationId BIGINT NOT NULL,
   Price DECIMAL (12,2) NOT NULL,
   Active INT NOT NULL,
  CONSTRAINT FK_LocationMenuItems_MenuItemId FOREIGN KEY (MenuItemId)
  REFERENCES [dbo].[MenuItems] (MenuItemId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_LocationMenuItems_LocationId FOREIGN KEY (LocationId)
  REFERENCES [dbo].[BusinessLocations] (LocationId)
  ON DELETE  NO ACTION
  ON UPDATE  NO ACTION
);

CREATE UNIQUE INDEX uq_LocationMenuItems
  ON [dbo].[LocationMenuItems](MenuItemId, LocationId);

CREATE TABLE DigitalAssetTypes
(
   DigitalAssetTypeId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   Name VARCHAR(255) NOT NULL UNIQUE,
   Description VARCHAR(1024) NOT NULL,
   IconId BIGINT,
  CONSTRAINT FK_DigitalAssetTypes_IconId FOREIGN KEY (IconId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
);

CREATE TABLE BusinessDigitalAssets
(
  DigitalAssetId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  BusinessId BIGINT NOT NULL,
  DigitalAssetTypeId BIGINT NOT NULL,
  AssetSpec VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_BusinessDigitalAssets_BusinessId FOREIGN KEY (BusinessId)
  REFERENCES [dbo].[Businesses] (BusinessId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_BusinessDigitalAssets_DigitalAssetTypeId FOREIGN KEY (DigitalAssetTypeId)
  REFERENCES [dbo].[DigitalAssetTypes] (DigitalAssetTypeId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_BusinessDigitalAssets
  ON [dbo].[BusinessDigitalAssets](BusinessId, DigitalAssetTypeId, AssetSpec);

CREATE TABLE MenuItemAnnotations
(
  MenuItemAnnotationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  MenuItemId BIGINT NOT NULL,
  ResourceId BIGINT NOT NULL,
  Sequence INT NOT NULL,
  Comment VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_MenuItemAnnotations_MenuItemId FOREIGN KEY (MenuItemId)
  REFERENCES [dbo].[MenuItems] (MenuItemId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_MenuItemAnnotations_ResourceId FOREIGN KEY (ResourceId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_MenuItemAnnotationsResources
  ON [dbo].[MenuItemAnnotations](MenuItemId, ResourceId);

  CREATE UNIQUE INDEX uq_MenuItemAnnotationsSequences
  ON [dbo].[MenuItemAnnotations](MenuItemId, Sequence);

CREATE TABLE BusinessAnnotations
(
  BusinessAnnotationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  BusinessId BIGINT NOT NULL,
  ResourceId BIGINT NOT NULL,
  Sequence INT NOT NULL,
  Comment VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_BusinessAnnotations_BusinessId FOREIGN KEY (BusinessId)
  REFERENCES [dbo].[Businesses] (BusinessId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_BusinessAnnotations_ResourceId FOREIGN KEY (ResourceId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_BusinessAnnotationsResources
  ON [dbo].[BusinessAnnotations](BusinessId, ResourceId);

  CREATE UNIQUE INDEX uq_BusinessAnnotationsSequences
  ON [dbo].[BusinessAnnotations](BusinessId, Sequence);

  CREATE TABLE BusinessLocationAnnotations
(
  LocationAnnotationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  LocationId BIGINT NOT NULL,
  ResourceId BIGINT NOT NULL,
  Sequence INT NOT NULL,
  Comment VARCHAR(1024) NOT NULL,
  CONSTRAINT FK_BusinessLocationAnnotations_LocationId FOREIGN KEY (LocationId)
  REFERENCES [dbo].[BusinessLocations] (LocationId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_BusinessLocationAnnotations_ResourceId FOREIGN KEY (ResourceId)
  REFERENCES [dbo].[Resources] (ResourceId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_BusinessLocationAnnotationsResources
  ON [dbo].[BusinessLocationAnnotations](LocationId, ResourceId);

  CREATE UNIQUE INDEX uq_BusinessLocationAnnotationsSequences
  ON [dbo].[BusinessLocationAnnotations](LocationId, Sequence);

CREATE TABLE LocationOperatingHours
(
  LocationOperatingHoursId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  LocationId  BIGINT NOT NULL,
  DayOfWeek INT NOT NULL,
  OpenTime INT NOT NULL,
  CloseTime INT NOT NULL ,
  CONSTRAINT FK_LocationOperatingHours_LocationId FOREIGN KEY (LocationId)
  REFERENCES [dbo].[BusinessLocations] (LocationId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
); 

CREATE UNIQUE INDEX uq_LocationOperatingHours
ON [dbo].[OperatingHours](LocationId, DayOfWeek);

CREATE TABLE SubscriptionFeatures
(
   FeatureId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   Name VARCHAR(255) NOT NULL UNIQUE,
   Description VARCHAR(1024) NOT NULL
);


CREATE TABLE SubscriptionFeatureLevels
(
   LevelId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
   FeatureId BIGINT NOT NULL,
   Name VARCHAR(255) NOT NULL,
   Description VARCHAR(1024) NOT NULL,
   Specification VARBINARY(max) NOT NULL,
   MonthlyCost DECIMAL NOT NULL ,
  CONSTRAINT FK_SubscriptionFeatureLevels_FeatureId FOREIGN KEY (FeatureId)
  REFERENCES [dbo].[SubscriptionFeatures] (FeatureId)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_SubscriptionFeatureLevels
ON [dbo].[SubscriptionFeatureLevels](FeatureId, Name);

CREATE TABLE ActivatedBusinessSubscriptionFeatureLevels
(
    LevelId BIGINT NOT NULL,
    BusinessSubscriptionId BIGINT NOT NULL,
    EffectiveDate DATETIME NOT NULL,
    ExpirationDate DATETIME NOT NULL,
    CONSTRAINT FK_ActivatedBusinessSubscriptionFeatureLevels_LevelId FOREIGN KEY (LevelId)
    REFERENCES [dbo].[SubscriptionFeatureLevels] (LevelId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_ActivatedBusinessSubscriptionFeatureLevels_SubscriptionId FOREIGN KEY (BusinessSubscriptionId)
    REFERENCES [dbo].[BusinessSubscriptions] (BusinessSubscriptionId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_ActivatedBusinessSubscriptionFeatureLevels
ON [dbo].[ActivatedBusinessSubscriptionFeatureLevels](LevelId, SubscriptionId);


CREATE TABLE UnActivatedBusinessSubscriptionFeatureLevels
(
    LevelId BIGINT NOT NULL,
    BusinessSubscriptionId BIGINT NOT NULL,
    RenewalTerm INT NOT NULL,
    PaymentEvidenceResourceId BIGINT NULL,
    MessageThreadId BIGINT NULL,
    CONSTRAINT FK_UnActivatedBusinessSubscriptionFeatureLevels_LevelId FOREIGN KEY (LevelId)
    REFERENCES [dbo].[SubscriptionFeatureLevels] (LevelId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_UnActivatedBusinessSubscriptionFeatureLevels_SubscriptionId FOREIGN KEY (BusinessSubscriptionId)
    REFERENCES [dbo].[BusinessSubscriptions] (BusinessSubscriptionId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_UnActivatedBusinessSubscriptionFeatureLevels
ON [dbo].[UnActivatedBusinessSubscriptionFeatureLevels](LevelId, BusinessSubscriptionId);


 

CREATE TABLE FlattenedLocationDetails
(
  LocationId BIGINT NOT NULL,
  BusinessId BIGINT NOT NULL,
  BusinessName VARCHAR(128),
  Longitude Decimal NULL,
  Latitude Decimal NULL,
  Address VARCHAR(1024),
  VendorTypes VARCHAR(1024),
  Specialties VARCHAR(1024),
  MenuItemCategories VARCHAR(1024),
  PlusCode VARCHAR(32),
  City VARCHAR(128),
  State VARCHAR(128),
  CONSTRAINT FK_FlattenedLocationDetails_BusinessId FOREIGN KEY (BusinessId)
  REFERENCES [dbo].[Businesses] (BusinessId)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT FK_FlattenedLocationDetails_LocationId FOREIGN KEY (LocationId)
  REFERENCES [dbo].[BusinessLocations] (LocationId)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION
);

CREATE INDEX ix_FlattenedLocationDetails_Longitude ON FlattenedLocationDetails (Longitude);
CREATE INDEX ix_FlattenedLocationDetails_Latitude ON FlattenedLocationDetails (Latitude);
CREATE INDEX ix_FlattenedLocationDetails_Address ON FlattenedLocationDetails (Address);
CREATE INDEX ix_FlattenedLocationDetails_VendorTypes ON FlattenedLocationDetails (VendorTypes);
CREATE INDEX ix_FlattenedLocationDetails_Specialties ON FlattenedLocationDetails (Specialties);
CREATE INDEX ix_FlattenedLocationDetails_MenuItemCategories ON FlattenedLocationDetails (MenuItemCategories);
CREATE INDEX ix_FlattenedLocationDetails_PlusCode ON FlattenedLocationDetails (PlusCode);
CREATE INDEX ix_FlattenedLocationDetails_City ON FlattenedLocationDetails (City);
CREATE INDEX ix_FlattenedLocationDetails_State ON FlattenedLocationDetails (State);
CREATE INDEX ix_FlattenedLocationDetails_BusinessName ON FlattenedLocationDetails (BusinessName);

CREATE TABLE FoodAndDrinkBusinessMenuSpecialties
(
    BusinessId BIGINT NOT NULL,
    MenuItemCategoryId BIGINT NOT NULL,
    CONSTRAINT FK_FoodAndDrinkBusinessMenuSpecialties_BusinessId FOREIGN KEY (BusinessId)
    REFERENCES [dbo].[Businesses] (BusinessId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_FoodAndDrinkBusinessMenuSpecialties_MenuItemCategoryId FOREIGN KEY (MenuItemCategoryId)
    REFERENCES [dbo].[MenuItemCategories] (MenuItemCategoryId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);