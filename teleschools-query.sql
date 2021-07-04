CREATE TABLE Schools
(
	SchoolId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(128) UNIQUE NOT NULL,
	Description VARCHAR(1024) NOT NULL, 
    AddressId BIGINT,
    PhoneNumberId BIGINT,
    CONSTRAINT FK_Schools_AddressId FOREIGN KEY (AddressId)
    REFERENCES [dbo].[Addresses] (AddessId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_Schools_PhoneNumberId FOREIGN KEY (PhoneNumberId)
    REFERENCES [dbo].[PhoneNumbers] (PhoneNumberId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE SchoolLevels
(
    LevelId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	SchoolId BIGINT NOT NULL,
    Level INT NOT NULL, 
	CONSTRAINT FK_SchoolLevels_SchoolId FOREIGN KEY (SchoolId)
        REFERENCES [dbo].[Schools] (SchoolId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_SchoolLevels
  ON [dbo].[SchoolLevels](SchoolId, Level);

CREATE TABLE LevelArms
(
    ArmId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	LevelId BIGINT NOT NULL,
    Arm VARCHAR(4) NOT NULL, 
	CONSTRAINT FK_LevelArms_LevelId FOREIGN KEY (LevelId)
        REFERENCES [dbo].[SchoolLevels] (LevelId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_LevelArms
  ON [dbo].[LevelArms](LevelId, Arm);

 
CREATE TABLE SatelliteDecoders
(
    DeviceId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    SerialNumber VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE SchoolStudents
( 
    SchoolId BIGINT NOT NULL,
    UserId BIGINT NOT NULL,
    ArmId BIGINT ,
    CONSTRAINT FK_SchoolStudents_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolStudents_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolStudents_ArmId FOREIGN KEY (ArmId)
    REFERENCES [dbo].[LevelArms] (ArmId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE UNIQUE INDEX uq_SchoolStudents
  ON [dbo].[SchoolStudents](SchoolId, UserId, ArmId);

CREATE TABLE SchoolStaff
( 
    SchoolId BIGINT NOT NULL,
    UserId BIGINT NOT NULL,
    IsTeacher INT DEFAULT (0)
    CONSTRAINT FK_SchoolStaff_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolStaff_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_SchoolStaff
  ON [dbo].[SchoolStaff](SchoolId, UserId);

 

create TABLE Subjects
(
	SubjectId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name VARCHAR(128) UNIQUE NOT NULL,
	Description VARCHAR(1024) NOT NULL
);

create TABLE TeacherSubjects
(
    UserId BIGINT NOT NULL,
    ArmId BIGINT NOT NULL,
    SubjectId BIGINT NOT NULL,
    CONSTRAINT FK_TeacherSubjects_SubjectId FOREIGN KEY (SubjectId)
    REFERENCES [dbo].[Subjects] (SubjectId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_TeacherSubjects_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_TeacherSubjects_ArmId FOREIGN KEY (ArmId)
    REFERENCES [dbo].[LevelArms] (ArmId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_TeacherSubjects
  ON [dbo].[TeacherSubjects](SubjectId, UserId, ArmId);

CREATE TABLE StudentSubjects
(
    UserId BIGINT NOT NULL,
    ArmId BIGINT NOT NULL,
    SubjectId BIGINT NOT NULL,
    CONSTRAINT FK_StudentSubjects_SubjectId FOREIGN KEY (SubjectId)
    REFERENCES [dbo].[Subjects] (SubjectId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_StudentSubjects_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_StudentSubjects_ArmId FOREIGN KEY (ArmId)
    REFERENCES [dbo].[LevelArms] (ArmId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_StudentSubjects
  ON [dbo].[StudentSubjects](SubjectId, UserId, ArmId);

create TABLE ClassTeachers
(
    ArmId BIGINT NOT NULL,
    UserId BIGINT NOT NULL, 
    CONSTRAINT FK_ClassTeachers_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_ClassTeachers_ArmId FOREIGN KEY (ArmId)
    REFERENCES [dbo].[LevelArms] (ArmId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_ClassTeachers
  ON [dbo].[ClassTeachers](ArmId, UserId);



create TABLE SchoolPhoneNumbers
(
    PhoneNumberId BIGINT NOT NULL,
    SchoolId BIGINT NOT NULL, 
    CONSTRAINT FK_SchoolPhoneNumbers_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolPhoneNumbers_PhoneNumberId FOREIGN KEY (PhoneNumberId)
    REFERENCES [dbo].[PhoneNumbers] (PhoneNumberId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE UNIQUE INDEX uq_SchoolPhoneNumbers
  ON [dbo].[SchoolPhoneNumbers](PhoneNumberId, SchoolId);

  create TABLE SchoolAddresses
(
    AddressId BIGINT NOT NULL,
    SchoolId BIGINT NOT NULL, 
    CONSTRAINT FK_SchoolAddresses_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolAddresses_AddressId FOREIGN KEY (AddressId)
    REFERENCES [dbo].[Addresses] (AddressId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE UNIQUE INDEX uq_SchoolAddresses
  ON [dbo].[SchoolAddresses](AddressId, SchoolId);


CREATE TABLE DeviceTypes
(
    DeviceTypeId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(1024) NOT NULL
)

create TABLE SchoolDevices
(
    UserId BIGINT NOT NULL ,
    DeviceTypeId BIGINT NOT NULL ,
    SchoolId BIGINT NOT NULL,
    DeviceCode VARCHAR(1024) NOT NULL UNIQUE,
    CONSTRAINT FK_SchoolDevices_DeviceTypeId FOREIGN KEY (DeviceTypeId)
    REFERENCES [dbo].[DeviceTypes] (DeviceTypeId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolDevices_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolDevices_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_SchoolDevices
  ON [dbo].[SchoolDevices](DeviceTypeId, UserId, SchoolId);

CREATE TABLE SchoolGroups
(
    SchoolGroupId BIGINT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(255) NOT NULL UNIQUE,
    Description VARCHAR(1024) NOT NULL,
    MembershipConstraints VARCHAR(2048) NOT NULL,
    SchoolId BIGINT NOT NULL,
    CONSTRAINT FK_SchoolGroups_SchoolId FOREIGN KEY (SchoolId)
    REFERENCES [dbo].[Schools] (SchoolId)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);

CREATE TABLE SchoolGroupMembers
(
    UserId BIGINT NOT NULL ,
    SchoolGroupId BIGINT NOT NULL , 
    CONSTRAINT FK_SchoolGroupMembers_SchoolGroupId FOREIGN KEY (SchoolGroupId)
    REFERENCES [dbo].[SchoolGroups] (SchoolGroupId)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_SchoolGroupMembers_UserId FOREIGN KEY (UserId)
    REFERENCES [dbo].[UserProfiles] (UserId)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX uq_SchoolGroupMembers
  ON [dbo].[SchoolGroupMembers](SchoolGroupId, UserId);




