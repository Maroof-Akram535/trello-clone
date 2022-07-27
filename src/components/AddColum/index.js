import "./index.css";
import React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
 import Button from "../Button/index";
function AddColumn({ onAddColumn }) {
  const [title, setTitle] = React.useState("");
  const dispatch = useDispatch();
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
     }
  };
  const createColumn = async () => {
    onAddColumn();
    dispatch({
      type: "ADD_COLUMN",
      payload: { columnId: Math.random().toString(), columnTitle: title },
    });
  };

  return (
    <div className="Add-List-Editor">
      <div className="List-Title-Edit">
        <input
          name="columnName"
          placeholder="Enter Column title"
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={onEnter}
        />
      </div>
      <Button
        handleSave={createColumn}
        saveLabel={"Add Column"}
        handleCancel={onAddColumn}
      />
    </div>
  );
}

export default connect()(AddColumn);
