import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectManu.module.css'

const SelectManu = ({ categoryId,sort,rate }) => {
  const [manufacture, setManufacture] = useState([]);
  const {pushQuery} = useCustomRouter();
  useEffect(() => {
    const getManufacture = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/manufacture/category/${categoryId}`
        );
        setManufacture(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getManufacture();
  }, []);
  const handleChange = (e) => {
    const { value } = e.target;
    pushQuery({page:1,manufacture:value,sort,rate})
  };

  return (
    <div className={style.selectManu}>
      <select onChange={handleChange}>
        <option value="0">Select Manufacture</option>
        {manufacture.length > 0 ? manufacture.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        )):null}
      </select>
    </div>
  );
};

export default SelectManu;
