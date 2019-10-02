import React from "react";
import ReactKeyboard from "react-simple-keyboard";

const Keyboard = ({ onChange }) => {
  return (
    <ReactKeyboard
      display={{
        "{bksp}": "Backspace",
        "{enter}": "Enter",
        "{shift}": "Shift",
        "{tab}": "Tab",
        "{lock}": "Caps Lock",
        "{space}": "Space"
      }}
      layout={{
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} q w e r t y u i o p [ ] \\",
          "{lock} a s d f g h j k l ; ' {enter}",
          "{shift} z x c v b n m , . / {shift}",
          "{space}"
        ]
      }}
      onChange={input => onChange(input)}
    />
  );
};

export default Keyboard;
