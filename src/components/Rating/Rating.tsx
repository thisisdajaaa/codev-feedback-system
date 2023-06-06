import React, { FC, useState } from "react";

import type { RatingProps } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const Rating: FC<RatingProps> = (props) => {
  const { value, onChange, readOnly } = props;

  const [hoverValue, setHoverValue] = useState<number>(0);

  const handleMouseOver = (ratingValue: number) => {
    if (!readOnly) {
      setHoverValue(ratingValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const handleClick = (ratingValue: number) => {
    if (!readOnly && onChange) {
      onChange(ratingValue);
    }
  };

  return (
    <div className="flex w-full justify-evenly">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;

        return (
          <label
            key={i}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <div className="cursor-pointer text-3xl">
                <Icon
                  src={
                    ratingValue <= (hoverValue || value)
                      ? "/assets/star-solid.svg"
                      : "/assets/star-outline.svg"
                  }
                />
              </div>

              <Typography
                variant="span"
                size="text-lg"
                lineHeight="leading-[1.875rem]">
                {ratingValue}
              </Typography>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export { Rating };
