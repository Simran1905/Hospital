create procedure AssignRoom
(
  @Room_Id int,
  @Patient_Id int,
  @Doctor_Name varchar(50),
  @Patient_Condition varchar(50),
  @Doctor_Id int,
  @Patient_Name varchar(50),
  @Room_Type varchar(50)
)
as
begin
   declare @roomcount as int;
   declare @Admission_Date as Date;
   set @Admission_Date = GetDate();

   select @roomcount=No_Of_Rooms from Room where Room_id=@Room_Id;
   if(@roomcount>0)
	begin
		insert into Room_Assignment values (@Room_Id,@Patient_Id,@Admission_Date,@Doctor_Name,@Patient_Condition,@Doctor_Id, @Patient_Name,@Room_Type);
		set @roomcount =@roomcount-1;
		update Room set No_Of_Rooms=@roomcount where Room_id=@Room_Id;
	end
end

create procedure BillAmount
(
  @Rid int,
  @Did int,
  @Pid int,
  @Doctor_Name varchar(50),
  @Patient_Name varchar(50),
  @Room_Type varchar(50),
  @Aid int,
  @Bill_Date datetime,
  @Medicine_Bill int,
  @Status varchar(10)
)
as
begin
	declare @Room_Bill as int;
	declare @Doctor_Bill as int;
	declare @Total_Bill as int;
	declare @noOfDays as int;
	declare @start_date as date;
	--noOfDays
	select @start_date=Admission_Date from Room_Assignment where Assignment_no=@Aid;
	set @noOfDays= DATEDIFF(day, @start_date, @Bill_Date);
	--RoomBill
	select @Room_Bill=Rates_Per_Day from Room where Room_id=@Rid;
	set @Room_Bill=@Room_Bill*@noOfDays;
	--DoctorBill
	select @Doctor_Bill=Charges_Per_Day from Doctor where Doctor_Id=@Did;
	set @Doctor_Bill=@Doctor_Bill*@noOfDays;
	--
	set @Total_Bill=@Room_Bill+@Doctor_Bill+@Medicine_Bill;

	insert into Billing values(@Rid,@Did,@Pid,@Doctor_Name,@Patient_Name,@Room_Type,@Bill_Date,@Room_Bill,@Doctor_Bill,@Medicine_Bill,@Total_Bill,@Aid,@Status);
end

create procedure ShiftRoom
(
  @Assignment_no int,
  @Room_Id int,
  @Patient_Id int,
  @Admission_Date datetime,
  @Doctor_Name varchar(50),
  @Patient_Condition varchar(50),
  @Doctor_Id int,
  @Patient_Name varchar(50),
  @Room_Type varchar(50)
)
as
begin
     declare @roomid as int; /* prev room */
	 select @roomid=Room_Id from  Room_Assignment where Assignment_no=@Assignment_no;
	 declare @roomcount as int;
	 select @roomcount=No_Of_Rooms from Room where Room_Id=@Room_Id; /* current room + */
	 if(@roomcount>0)
	 begin
		update Room_Assignment set Room_Id=@Room_Id,Patient_Id=@Patient_Id,Admission_Date=@Admission_Date,Doctor_Name=@Doctor_Name,Patient_Condition=@Patient_Condition,Doctor_Id=@Doctor_Id,Patient_Name=@Patient_Name,Room_Type=@Room_Type where Assignment_no=@Assignment_no;
		update Room set No_Of_Rooms=No_Of_Rooms-1 where Room_Id=@Room_Id;
		update Room set No_Of_Rooms=No_Of_Rooms+1 where Room_Id=@roomid;
	end
end

create Procedure ListPayment
as
select * from PaymentBils

create procedure SearchPayment(@Payment_Id int)
as
select Payment_Id,Patient_Bill_Id,Patient_Name,Doctor_Name,Doctor_Bill,Room_Bill,Medicine_Bill,Total_Bill
,Status from PaymentBils where Payment_Id=@Payment_Id

create procedure GeneratePayment(
@Patient_Bill_Id int,
@Status varchar(10)
)
as
   declare
   @Patient_Name as varchar(50),
   @Doctor_Name varchar(50),
   @Room_Bill as int,
   @Doctor_Bill as int,
   @Medical_Bill as int,
   @Total_Bill as int
begin
select @Patient_Name=b.Patient_Name,@Doctor_Name=b.Doctor_Name,
@Room_Bill=b.Room_Bill,@Doctor_Bill=b.Doctor_Bill,
@Medical_Bill=b.Medicine_Bill,@Total_Bill=b.Total_Bill from Billing b
where b.Bill_Id=@Patient_Bill_Id
insert into PaymentBils(Patient_Bill_Id,Patient_Name,Doctor_Name,Doctor_Bill,Room_Bill,Medicine_Bill,Total_Bill,Status)
values(@Patient_Bill_Id,@Patient_Name,@Doctor_Name,@Doctor_Bill,@Room_Bill,@Medical_Bill,@Total_Bill,@Status)
update Billing set Status=@Status where Bill_Id=@Patient_Bill_Id;

end

create procedure DeletePayment(@Payment_Id int)
as
delete PaymentBils where Payment_Id=@Payment_Id


create procedure [dbo].[DeleteBillDetails]
(@Patient_bill_Id int)
as
delete Generate_Bill where Patient_Bill_Id=@Patient_bill_Id

create procedure [dbo].[DeletePatient]
(
@Patient_Id int
)
as
delete Patient where Patient_Id=@Patient_Id

create procedure [dbo].[DeletePayment](@Payment_Id int)
as
delete PaymentBils where Payment_Id=@Payment_Id

create procedure [dbo].[Generate_bills]
(
  @Assignment_no int,
  @Patient_name varchar(50),
  @Doctor_Name varchar(50),
  @room_bill int,
  @medicine_bill int,
  @doctor_bill int
 
)
as
begin
   
   declare @Date as Date;
   set @Date = GetDate();

    declare @total_bill as int;
    set @total_bill = @room_bill+@medicine_bill+@doctor_bill;

   

   
	begin
		insert into Generate_Bill values (@Assignment_no,@Patient_name,@Date,@Doctor_Name,@room_bill,
@medicine_bill, @doctor_bill,@total_bill);
end
		
end

create procedure [dbo].[GetBillDetails]
as
select * from Generate_Bill

create procedure [dbo].[GetPayment]
as
select* from Payment

create procedure [dbo].[InsertPatient]
(
@Patient_Name varchar(50),
@Gender varchar(10),
@Age int,
@Patient_Address varchar(200),
@Contact_No varchar(10),
@Guardian_Name varchar(50),
@Emergency_contact_no varchar(10),
@Nature_Of_Disease varchar(200),
@Patient_Condition varchar(250),
@Doctor_Name varchar(50),
@Room_Type varchar(50)

)
as 
begin
Insert into Patient values
(
@Patient_Name,
@Gender,
@Age,
@Patient_Address,
@Contact_No,
@Guardian_Name,
@Emergency_contact_no,
@Nature_Of_Disease,
@Patient_Condition,
@Doctor_Name,
@Room_Type
)
end


create procedure [dbo].[ListPatient]
as
Select * from Patient

create Procedure [dbo].[ListPayment]
as
select * from PaymentBils

create procedure [dbo].[SearchBill](
@Patient_bill_id int )
as
select Patient_Bill_Id,Patient_Name,Doctor_Name,Assignment_No,Doctor_Bill,Room_Bill,Medicine_Bill,Total_Bill from Generate_Bill where Patient_Bill_Id=@Patient_bill_id

create procedure [dbo].[SearchPatient]
(
@Patient_Id int,
@Patient_Name varchar(50),
@Gender varchar(10),
@Age int,
@Patient_Address varchar(200),
@Contact_No varchar(10),
@Guardian_Name varchar(50),
@Emergency_contact_no varchar(10),
@Nature_Of_Disease varchar(200),
@Patient_Condition varchar(250),
@Doctor_Name varchar(50),
@Room_Type varchar(50)
)
as
Select 
Patient_Id=@Patient_Id,
Patient_Name=@Patient_Name,
Gender=@Gender,
Age=@Age,
Patient_Address=@Patient_Address,
Contact_No=@Contact_No,
Guardian_Name=@Guardian_Name,
Emergency_contact_no=@Emergency_contact_no,
Nature_Of_Disease=@Nature_Of_Disease,
Patient_Condition=@Patient_Condition,  
Doctor_Name=@Doctor_Name,
Room_Type=@Room_Type
from Patient where Patient_Id=@Patient_Id


create procedure [dbo].[SearchPayment](@Payment_Id int)
as
select Payment_Id,Patient_Bill_Id,Patient_Name,Doctor_Name,Doctor_Bill,Room_Bill,Medicine_Bill,Total_Bill
,Status from PaymentBils where Payment_Id=@Payment_Id

create procedure [dbo].[SearchReport]
(
@PaymentId int
)
as
select PaymentId,PatientName,Age,Gender,Address,ContactNumber,
Status from Payment where PaymentId=PaymentId