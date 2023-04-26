export const queries = {
  // consulta de la tabla Products
  getAllProducts: "SELECT * FROM [webNode].[dbo].[Products]",
  addNewProduct:
    "INSERT INTO [webNode].[dbo].[Products] (name, description, quantity) VALUES (@name, @description, @quantity)",
  getProductById: "SELECT * FROM [webNode].[dbo].[Products] where Id = @Id",
  deleteProduct: "DELETE FROM [webNode].[dbo].[Products] where Id = @Id",
  getTotalProducts: "SELECT COUNT(*) FROM [webNode].[dbo].[Products]",
  updateProductById: "UPDATE [webNode].[dbo].[Products] SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id",
};
