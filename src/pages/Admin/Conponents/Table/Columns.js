import style from "../List/List.module.css";
export const columnsUsers = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "fullName", headerName: "Full name", width: 120 },
  {
    field: "address",
    headerName: "Address",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "account.role",
    headerName: "Role",
    width: 90,
  },
  {
    field: "account.username",
    headerName: "Username",
    width: 120,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img
            className={style.cellImg}
            src={
              params.row["avatarUser.image"] === null
                ? "../../../../images/Avatar/avatar.jpg"
                : `${params.row["avatarUser.image"]}`
            }
            alt="avatar"
          />
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
];

export const columnsProducts = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img
            className={style.cellImg}
            src={
              params.row.image === null
                ? "../../../../images/Avatar/avatar.jpg"
                : `${params.row["imageProduct.image"]}`
            }
            alt="product"
          />
        </div>
      );
    },
  },
  {
    field: "category.name",
    headerName: "Name Category",
    width: 150,
  },
  {
    field: "manufacture.name",
    headerName: "Name Manufacture",
    width: 150,
  },
];

export const columnsCategory = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
];

export const columnsManufacture = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "nameCategory", headerName: "Name Category", width: 150 }
];
export const columnsOrder = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "user.fullName", headerName: "Full Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "user.email", headerName: "Email", width: 250 },
  { field: "createdAt", headerName: "CreatedAt", width: 180 },
  { field: "updatedAt", headerName: "UpdatedAt", width: 180 },
];
export const columnsHistory = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "createdAt", headerName: "Date", width: 180 },
];
