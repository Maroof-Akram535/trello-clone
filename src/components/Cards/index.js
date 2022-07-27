import "./index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import CardEditor from "./addEditCard";
function Index({ cardId, index }) {
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const card = useSelector((state) => state?.cardsById[cardId] );
 const dispatch=useDispatch();
  const startEditing = () => {
    setHover(false);
    setEditing(true);
  };

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

 const editCard = async (text) => {
 
    endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text },
    });
  };
  if (!editing) {
    return (
      <Draggable draggableId={cardId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <ion-icon name="create" />
                </div>
              </div>
            )}

            {card?.text}
          </div>
        )}
      </Draggable>
    )}
    else {
      return (
        <CardEditor
          text={card.text}
          onSave={editCard}
          onCancel={endEditing}
        />
      );
    };
  
}

export default connect()(Index);
