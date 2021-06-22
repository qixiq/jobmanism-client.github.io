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