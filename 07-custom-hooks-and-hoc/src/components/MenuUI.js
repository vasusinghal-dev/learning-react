import starImg from "url:../images/star.png";
import Accordion from "./Accordion.js";
import MenuItem from "./MenuItem.js";
import React from "react";

const MenuUI = ({ menu }) => {
  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
    sla,
    costForTwoMessage,
  } = menu?.cards[2]?.card?.card?.info;

  const categories = menu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    .map((c) => c.card?.card)
    .filter(
      (cat) =>
        cat["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        cat["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory",
    );

  return (
    <div className="mx-[600px] my-5">
      <div className="mx-4 my-6 text-3xl font-bold">{name}</div>
      <div className="rounded-b-[30px] bg-[linear-gradient(rgb(255,255,255)_-6.71%,rgb(235,235,242)_56.19%,rgb(223,223,231)_106.56%)] px-4 pb-4">
        <div className="flex flex-col justify-center rounded-[20px] border border-solid border-[rgba(2_6_12_/0.15)] bg-white py-5">
          <div className="mx-5 flex gap-1 text-sm font-bold">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green-700 [&>img]:w-3">
              <img src={starImg} alt="star" />
            </span>
            {avgRating} ({totalRatingsString}) • {costForTwoMessage}
          </div>
          <div className="mx-5 my-2 text-sm font-bold text-[#ff5200]">
            {cuisines.join(", ")}
          </div>
          <div className="mx-5 flex">
            <div className="flex flex-col items-center justify-center">
              <div className="h-2 w-2 rounded-[50%] bg-[gainsboro]" />
              <div className="h-6 w-px bg-[#c4c4c4]" />
              <div className="h-2 w-2 rounded-[50%] bg-[gainsboro]" />
            </div>
            <div className="ml-3 flex flex-col items-start justify-center gap-2 text-sm text-[#02060c]">
              <div className="flex gap-3 tracking-normal">
                <span className="font-bold tracking-normal">Outlet</span>
                <span>
                  {areaName} <span className="text-[orangered]">▾</span>
                </span>
              </div>
              <div className="font-bold tracking-normal">
                {sla?.slaString.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-6 h-[0.5px] w-[calc(100%-32px)] bg-[rgba(2_6_12/0.15)]" />
      <div className="m-[24px_16px_16px]">
        {categories.map((category) => {
          const type = category["@type"];

          if (
            type ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          ) {
            const menuItems = category?.itemCards;

            return (
              <React.Fragment key={category?.categoryId}>
                <Accordion
                  title={`${category?.title} (${menuItems.length})`}
                  open
                >
                  {menuItems?.map((item, index) => (
                    <MenuItem
                      key={item?.card?.info?.id}
                      item={item?.card?.info}
                      showDivider={index < menuItems.length - 1}
                    />
                  ))}
                </Accordion>
                <div className="h-4 border-b-16 border-[rgba(2_6_12/0.0509803922)]" />
              </React.Fragment>
            );
          } else if (
            type ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
          ) {
            const subCategories = category?.categories;
            return (
              <React.Fragment key={category?.categoryId}>
                <div className="mx-auto mt-5 mb-6 w-[96%] text-lg font-bold">
                  {category.title}
                </div>
                <div className="">
                  {subCategories?.map((subCat, index) => {
                    const menuItems = subCat?.itemCards;

                    return (
                      <React.Fragment key={subCat?.categoryId}>
                        <Accordion
                          title={`${subCat.title} (${menuItems.length})`}
                          isSubCategory
                        >
                          {menuItems.map((item, index) => (
                            <MenuItem
                              key={item?.card?.info?.id}
                              item={item?.card?.info}
                              showDivider={index < menuItems.length - 1}
                            />
                          ))}
                        </Accordion>
                        {index < menuItems.length - 1 && (
                          <div className="mx-auto h-[0.5px] w-[calc(100%-32px)] bg-[rgba(2_6_12/0.15)]" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="h-4 border-b-16 border-[rgba(2_6_12/0.0509803922)]" />
              </React.Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};
export default MenuUI;
