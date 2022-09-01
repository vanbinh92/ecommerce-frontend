import React from "react";
import HeaderAdmin from "../../pages/Admin/Header/Header";
import Sidebar from "../../pages/Admin/Sidebar/Sidebar";
import style from './AdminLayout.module.css'

function AdminLayout({ children }) {
  return (
    <div className={style.admin}>
      <HeaderAdmin />
      <div className={style["body-admin"]}>
        <div className={style["sidebar-admin"]}>
          <Sidebar />
        </div>
        <div className={style["container-admin"]}>{ children }</div>
      </div>
    </div>
  );
}

export default AdminLayout;
