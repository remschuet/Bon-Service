import React, { useState } from "react";
import Direction from "../classes/Direction";
import {
  BiMessageSquareEdit,
  BiMessageSquareCheck,
  BiMessageSquareX,
} from "react-icons/bi";

export default function DirectionItem({
  direction,
  onRemove,
}: {
  direction: Direction;
  onRemove: (number: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(direction.textContent);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleRemoveDirection = () => {
    onRemove(direction.number);
  };

  return (
    <div className="direction-item-wrapper">
      <label className="direction">
        <div>
          <strong>{direction.number}.</strong>
        </div>
        <div className="direction-content">
          {isEditing ? (
            <input type="text" value={editedText} onChange={handleTextChange} />
          ) : (
            <span>{editedText}</span>
          )}
        </div>
      </label>

      <div className="editable-features">
        <div onClick={toggleEditing}>
          {isEditing ? (
            <div className="save">
              <BiMessageSquareCheck />
            </div>
          ) : (
            <div className="edit">
              <BiMessageSquareEdit />
            </div>
          )}
        </div>
        <div className="remove" onClick={handleRemoveDirection}>
          <BiMessageSquareX />
        </div>
      </div>
    </div>
  );
}
