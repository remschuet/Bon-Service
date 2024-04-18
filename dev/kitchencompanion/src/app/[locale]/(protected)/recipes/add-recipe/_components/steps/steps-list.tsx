import React from "react";
import DirectionItem from "./DirectionItem";
import Direction from "../classes/Direction";

export default function DirectionList({
  directions,
  onRemoveDirection,
}: {
  directions: Direction[];
  onRemoveDirection: (number: number) => void;
}): JSX.Element {
  return (
    <>
      {directions.map((direction, key) => {
        return (
          <div key={key}>
            <DirectionItem direction={direction} onRemove={onRemoveDirection} />
          </div>
        );
      })}
    </>
  );
}
