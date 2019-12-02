import React, { Component} from "react";
import ReactKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";


class Keyboard extends Component{
  render(){
      return (
        <ReactKeyboard
          display={{
            "{bksp}": "Backspace",
            "{enter}": "Enter",
            "{shift}": "Shift",
            "{tab}": "Tab",
            "{lock}": "Caps Lock",
            "{space}": "Space",
            "{lang}": "ENG"
          }}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} {lang} z x c v b n m , . / @ {shift}",
              "{space}"
            ]
          }}
          ref={r => {this.props.onRef && this.props.onRef(r)}}
          {...this.props}
        />
      );
  }
}

export default Keyboard;
