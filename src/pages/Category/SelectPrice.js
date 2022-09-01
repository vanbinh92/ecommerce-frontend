import React from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectPrice.module.css'

const SelectPrice = ({page,manufacture,rate}) => {
  const {pushQuery} = useCustomRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    pushQuery({page, manufacture,sort:value,rate})
  };

  return (
    <div className={style.selectPrice}>
      <select onChange={handleChange}>
        <option value="">Sort by Price</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SelectPrice;
