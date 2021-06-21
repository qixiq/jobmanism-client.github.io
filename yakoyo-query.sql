CREATE TABLE VendorBusinesses
(
	VendorId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  CreatorId BIGINT NOT NULL,
	Name VARCHAR(128) UNIQUE NOT NULL,
	Description VARCHAR(1024) NOT NULL
);

CREATE TABLE VendorBusinessLocations
(
  LocationId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
  VendorId BIGINT NOT NULL,
  AddressId BIGINT NOT NULL,
  PrimaryPhoneNumberId BIGINT NOT NULL
);









