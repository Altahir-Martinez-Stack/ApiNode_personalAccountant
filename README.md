# Tools Easier Life
### Module - Personal accountant
- BD
    * sequelize (postgres)
- Models
    * Detail
    * DetailType
    * User
- Controllers
    * Auth
    * DetailType
    * Details
        + getDetail GET /details
        + getDetailById GET /details/:id
        + createNewDetail POST /details
        + createNewDetails POST /details/all
        + updateDetail PUT /details/:id
        + deleteDetail DELETE /details/:id
        + deleteDetails DELETE /details/all?search=test&ids=1,2,3
        + searchDetail POST /detailSearch
    * Mails


