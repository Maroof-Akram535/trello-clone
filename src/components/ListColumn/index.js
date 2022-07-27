import "./index.css";
import React  from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../Cards/index";
import CardEditor from "../Cards/addEditCard";
import { useDispatch, useSelector } from "react-redux";
 function Index({ columnId, index }) {
  const [addingCard, setAddCard] = React.useState(false);
  const [editingTitle, setEditingTitle] = React.useState(false);
   const column = useSelector((state) => state?.columnsById[columnId]);
    const dispatch = useDispatch();
  const toggleAddingCard = () => {
    setAddCard(!addingCard);
  };

  const addCard = async (cardText) => {
    toggleAddingCard();

    const cardId = Math.random().toString();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, columnId },
    });
  };

  const toggleEditingTitle = () => {
    setEditingTitle(!editingTitle);
  };

  
  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
            <div className="List-Title" onClick={toggleEditingTitle}>
              {column?.columnTitle}
            </div>
          
          <Droppable droppableId={columnId}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {column.cards &&
                  column.cards.map((cardId, index) => (
                    <Card
                      key={ cardId}
                      cardId={cardId}
                      index={index}
                      columnId={columnId}
                    />
                  ))}

                {provided.placeholder}

                {addingCard ? (
                  <CardEditor onSave={addCard} onCancel={toggleAddingCard}  adding/>
                ) : (
                  <div
                    className="Toggle-Add-Card"
                    onClick={() => {
                      toggleAddingCard();
                     }}
                  >
                    <ion-icon name="add" /> Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default connect(null, null)(Index);
