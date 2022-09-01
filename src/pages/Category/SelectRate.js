import React from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectRate.module.css'

const SelectRate = ({manufacture,sort}) => {
  const {pushQuery} = useCustomRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    pushQuery({page:1, manufacture,sort,rate:value})
  };

  return (
    <div className={style.selectRate}>
      <select onChange={handleChange}>
        <option value="0">Sort by Rate</option>
        <option value="4">4 star and up</option>
        <option value="3">3 star and up</option>
        <option value="2">2 star and up</option>
        <option value="1">1 star and up</option>
      </select>
    </div>
  );
};

export default SelectRate;
