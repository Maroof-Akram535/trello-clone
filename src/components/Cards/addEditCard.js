import "./index.css";
import React from "react";
import Button from "../../components/Button/index";
function AddEditCard({ onSave, onCancel, onDelete, adding,text }) {
  const [Text, setText] = React.useState(text);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(Text);
    }
  };
  return (
    <div className="Edit-Card">
      <div className="Card">
        <input
          name="cardName"
          placeholder="Enter Card title"
          value={Text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <Button
        handleSave={() => onSave(Text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
}

export default AddEditCard;
