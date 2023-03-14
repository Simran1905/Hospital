--Creating database Hospital_Management_System
create database Hospital_Management_System
--Using database Hospital_Management_System
use database Hospital_Management_System
--Registration table
create table Registration(ID int primary key,UserName varchar(50) not null,Password varchar(50)
not null,Email varchar(50) not null)
--Creating table Doctor
Create table Doctor(Doctor_Id int primary key not null,Doctor_Name varchar(50) not null,
Contact_No varchar(10) not null,Speciliazation varchar(50) not null,Charges_Per_Day int
not null)
--Creating table Patient
Drop table Patient
create table Patient(Patient_Id int primary key not null,Patient_Name varchar(50)not null,
Gender varchar(10) not null,Age int not null,Patient_Address varchar(200) not null,Contact_No
varchar(10) not null,Guardian_Name varchar(50) not null,Emergency_contact_no varchar(10)
not null,Nature_Of_Disease varchar(200) not null,Patient_Condition varchar(250) not null,
Doctor_Name varchar(50) not null,Room_Type varchar(50) not null)
--Creating table Room
drop table Room
create table Room(Room_id int primary key not null identity(1,1),Room_type varchar(200) not null,No_Of_Rooms
int not null,Rates_Per_Day int not null)
--Creating table Room_Assignment
Drop table Room_Assignment
create table Room_Assignment(Assignment_no int primary key not null identity(1,1),Room_Id int references Room(Room_id),Patient_Id
int not null,Admission_Date datetime null,Doctor_Name varchar(50) null,Patient_Condition
varchar(50) null,Doctor_Id int references Doctor(Doctor_Id),Patient_Name varchar(50) null,
Room_Type varchar(50) null)
--Creating table Billing
drop table billing
Create table Billing(Bill_Id int primary key not null identity(1,1),Rid int not null,Did int not null,
Pid int not null,Doctor_Name varchar(50) not null,Patient_Name varchar(50) not null,Room_type
varchar(50) not null,Bill_Date datetime not null,Room_Bill int not null,Doctor_Bill int not null
,Medicine_Bill int not null,Total_Bill int not null,Aid int not null,Status varchar(50) null)
--Creating table PaymentBils
drop table PaymentBils
Create table PaymentBils(Payment_id int primary key identity(1,1),Patient_Bill_Id int references 
Billing(Bill_Id),Patient_Name varchar(50) not null,Doctor_Name varchar(50) not null,Room_Bill
int not null,Doctor_Bill int,Medicine_Bill int,Total_Bill int,Status varchar(10))
--Creating table Report
create table Report(ReportId int primary key not null identity(1,1),PaymentId int not null,PatientName 
varchar(50) not null,PatientAddress varchar(50) not null,ContactNo varchar(10) not null,
Disease varchar(50) not null,PatientCondition varchar(50) not null,AdmissionDate datetime not null,
DoctorName varchar(50) not null,DischargeDate datetime not null,Patient_Id int references
Patient(Patient_Id),Patient_BillId int not null)