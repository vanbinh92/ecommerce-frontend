import React from "react";
import SliderBanner from "../../components/Slider/SliderBanner";
import style from "./Home.module.css";
import CategoryProduct from "../../components/Category/Category";
import Slide from "../../components/Category/Slide/Slide";

function Home({ categoryList, handleAddProducts }) {
  return (
    <div className={style.container}>
      <CategoryProduct categoryList={categoryList} />
      <SliderBanner />
      {categoryList.length > 0
        ? categoryList.map((item) => {
            return (
              <div key={item.id}>
                <Slide title={item.name} id={item.id} handleAddProducts={handleAddProducts}/>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Home;
