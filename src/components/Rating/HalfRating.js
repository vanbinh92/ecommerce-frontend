import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function HalfRating({ size, readOnly,setRating,value }) {
  return (
    <div>
      {readOnly ? (
        <Stack spacing={1}>
          <Rating
            name="rating"
            defaultValue={5}
            value={Number(value)}
            precision={0.1}
            size={size}
            readOnly
          />
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Rating
            name="rating"
            precision={1}
            defaultValue={5}
            size={size}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Stack>
      )}
    </div>
  );
}

export default HalfRating;
