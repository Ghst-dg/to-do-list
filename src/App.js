import React, {useState, useEffect} from "react";
import './App.css'
import Slab from "./Slab";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//values that each card start with
let iniData = [
  {id: '1',
  title: 'Add a Title',
  note: `To save your notes lose focus from the textarea i.e. click anywhere in whitespace. The app uses your browser local storage to save your notes. YOU MAY REMOVE THESE INSTRUCTION TO USE IT TO STORE NOTES, REMEMBER TO LOSE FOCUS TO SAVE NOTES.`,
  completed: false,
  bgImg: 'bg2',
  sideLine: '#00B8D9',
  saved: true
  }
];

function App() {
  //hook to get, store and manipulate
  const initialState = JSON.parse(window.localStorage.getItem('data'));
  const [data, setData] = useState(initialState || iniData); //checking local storage

  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data));
  }, [data]) //setting data inside local storage


  //function to add new note card with random id generator as string
  const addNoteCard = () => {
    const id = (Math.floor((Math.random() * 1000000) + 1)).toString();
    const arr = [{bg : 'bg1',
                  sideLine : '#6554C0'},
                  {bg : 'bg2',
                  sideLine : '#00B8D9'},
                  {bg : 'bg3',
                  sideLine : '#FFAB00'},
                  {bg : 'bg4',
                  sideLine : '#36B37E'},
                  {bg : 'bg5',
                  sideLine : '#FF5630'}];
    const index = Math.floor((Math.random() * 5));

    const temp = {title: 'Add a Title',
      note: 'Write Your Notes Here',
      completed: false,
      bgImg: arr[index].bg,
      sideLine: arr[index].sideLine,
      bgColor: arr[index].bgColor,
      saved: true
      }

    const newCard = {id, ...temp};
    setData([...data, newCard]);
  }

  //function to toggle if card is complete or not
  const completionToggler = (id) => {
    setData(
      data.map((data) =>
        data.id === id ? {...data, completed: ! data.completed} : data
        )
      )
  }

  const dataUnsaved = (id) => {
    setData(
      data.map((data) =>
        data.id === id ? {...data, saved : false} : data
      )
    )
  }

  //function to delete card from the data
  const deleteCard = (id) => {
    setData(data.filter((data) => data.id !== id))
  }

  //function to reorder data according
  function handleOnDragEnd(result) {
    if(!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  }

  //function to get live changes in card and update it to the data
  const updateTitle = (id, value) => {
    setData(data.map((data) =>
        data.id === id ? {...data, title : value, saved : true} : data
        )
      )
  }

  //function to get live changes in notes and update it to the data
  const updateNotes = (id, value) => {
    setData(data.map((data) =>
      data.id === id ? {...data, note : value, saved : true} : data
      )
    )
  }

  return (
    <div className="main">

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="boxContainer">

        {(provided) => (
          <div className='boxContainer' {...provided.droppableProps} ref={provided.innerRef}>
            {data.map(({id, title, note, completed, bgImg, sideLine, saved}, index) => {
              return (

                <Draggable key = {id} draggableId = {id} index = {index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                  className = 'noteBox'>

                      <Slab id = {id}
                        title = {title}
                        note = {note}
                        completed = {completed}
                        bgImg = {bgImg}
                        sideLine = {sideLine}
                        saved = {saved}
                        completionToggler = {completionToggler}
                        dataUnsaved = {dataUnsaved}
                        deleteCard = {deleteCard}
                        updateTitle = {updateTitle}
                        updateNotes = {updateNotes} />

                  </div>
                )}
                </Draggable>

              );
            })}
            {provided.placeholder}
          </div>
        )}

        </Droppable>
      </DragDropContext>

      <div className="btnContainer">
        <button onClick={() => addNoteCard()}>Add Slab</button>
      </div>

    </div>
  );
}

export default App;