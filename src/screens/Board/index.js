import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "../../components/ListColumn/index";
import AddColumn from "../../components/AddColum/index";
function Index() {
  const [addColumn, setAddColumn] = React.useState(false);
  const board = useSelector((state) => state.board);
  const dispatch=useDispatch();
   const onAddColumn = () => {
    setAddColumn(!addColumn);
  };

  const handleDrag = ({ source, destination, type }) => {
 
     if (!destination) return;
     if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className="Board" ref={provided.innerRef}>
            {board?.columns?.map((columnId, index) => {
              return <List columnId={columnId} key={index} index={index} />;
            })}

            {provided.placeholder}

            <div className="Add-List">
              {addColumn ? (
                <AddColumn onAddColumn={onAddColumn} />
              ) : (
                <div onClick={onAddColumn} className="Add-List-Button">
                  Add a Column
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default connect(null, null)(Index);
