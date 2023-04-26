export const queries = {
  //Detail
  validatingDetailById:
    "SELECT CAST(CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS BIT) AS Result FROM [systemselftDB].[dbo].[Detail] WHERE Id = @id;",
  getDetail: "SELECT * FROM [systemselftDB].[dbo].[Detail]",
  addNewDetail:
    "INSERT INTO [systemselftDB].[dbo].[Detail] (DetailTypeId, Name, Amount, AmountOfMoney, Description, Date) VALUES (@detailTypeId,@name, @amount, @amountOfMoney, @description, @date)",
  getDetailById: "SELECT * FROM [systemselftDB].[dbo].[Detail] WHERE Id = @id",
  searchDetail:
    "SELECT * FROM [systemselftDB].[dbo].[Detail] WHERE Name LIKE @search",
  deleteDetailById: "DELETE FROM [systemselftDB].[dbo].[Detail] WHERE Id = @id",
  updateDetailById:
    "UPDATE [systemselftDB].[dbo].[Detail] SET DetailTypeId = @detailTypeId, Name = @name,Amount = @amount,AmountOfMoney = @amountOfMoney,Description = @description WHERE Id = @id",
  //DetailType
  getDetailType: "SELECT * FROM [systemselftDB].[dbo].[DetailType]",
  addNewDetailType:
    "INSERT INTO [systemselftDB].[dbo].[DetailType] (NameNumber, Name, Tags, Date) VALUES (@nameNumber, @name, @tags, @date)",
  getDetailTypeById:
    "SELECT * FROM [systemselftDB].[dbo].[DetailType] WHERE Id = @id",
  getDetailTypeByDetailId:
    "SELECT * FROM [systemselftDB].[dbo].[DetailType] WHERE DetailId = @id",
  updateDetailTypeById:
    "UPDATE [systemselftDB].[dbo].[DetailType] SET NameNumber = @nameNumber,Name = @name,Tags = @tags WHERE Id = @id",
  deleteDetailById:
    "DELETE FROM [systemselftDB].[dbo].[DetailType] WHERE Id = @id",
};
