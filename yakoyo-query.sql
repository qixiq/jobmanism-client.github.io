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

