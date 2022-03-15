import React from "react";
import "./app.css";

export function App() {
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState("");
  const [checkedState, setCheckedState] = React.useState([]);

  let initialLabel = "Adicione um novo item :)";

  const enterKeyPress = (event) => {
    const { charCode, target } = event;
    if (charCode === 13) {
      setList([...list, target.value]);
      setCheckedState([...checkedState, false]);
      setText("");
    }
  };

  const handleChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckedState(updatedCheckedState);
  };

  const removeListItem = (position) => {
    const removedListItem = list.filter((item, index) =>
      index !== position ? item : null,
    );

    const removedCheckedListItem = checkedState.filter(
      (item, index) => index !== position,
    );

    setCheckedState(removedCheckedListItem);
    setList(removedListItem);
  };

  const newListItem = (value, index) => {
    return (
      <div className="list" key={value + index}>
        <div className="list__item">
          <input
            type="checkbox"
            name={value}
            id={value}
            checked={checkedState[index]}
            onChange={() => handleChecked(index)}
          />
          <label
            className={checkedState[index] ? "scratched" : ""}
            htmlFor={value}
          >
            {value}
          </label>
        </div>

        <span onClick={() => removeListItem(index)}>X</span>
      </div>
    );
  };

  return (
    <div className="todo">
      <input
        className="todo__input"
        type="text"
        value={text}
        placeholder="Adicione um item e aperte enter.."
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(event) => enterKeyPress(event)}
      />
      {!list.length ? newListItem(initialLabel, 0) : null}
      {list.map((itemList, index) => newListItem(itemList, index))}
    </div>
  );
}
