import React, { Component} from "react";
import ReactKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./Keyboard.scss";
import {connect} from "react-redux";
import {setKeyboard} from "../../../store/actions";


class Keyboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      language: this.props.keyboardLanguage || this.LANG.EN,
      lockEnabled: false,
      layoutName: this.LAYOUT.DEFAULT,
    }
  }

  LAYOUT = {
    DEFAULT: 'default',
    SHIFT: 'shift',
  };

  LANG = {
    EN: 'en',
    RU: 'ru',
    UK: 'uk',
  };

  getLayout(){
    const layoutName = this.state.layoutName;
    const language = this.state.language;
    return `${layoutName}_${language}`
  }

  handleLang = () => {
    const language = this.state.language;
    let nextLang;
    if(language === this.LANG.EN) nextLang = this.LANG.RU;
    if(language === this.LANG.RU) nextLang = this.LANG.UK;
    if(language === this.LANG.UK) nextLang = this.LANG.EN;
    this.setState({
      language: nextLang
    }, () => {
      this.props.dispatch(setKeyboard(this.state.language))
    })
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === this.LAYOUT.DEFAULT ? this.LAYOUT.SHIFT : this.LAYOUT.DEFAULT
    });
  };

  changeLock = (value) => {
    this.setState({
      lockEnabled: value
    });
  };

  onKeyPress = button => {
    const layoutName = this.state.layoutName;
    const lockEnabled = this.state.lockEnabled;

    if ((button !== "{shift}" && !lockEnabled) && layoutName === this.LAYOUT.SHIFT) this.handleShift();
    if ((button === "{shift}" && !lockEnabled) || button === "{lock}") this.handleShift();

    if(button === "{lock}") this.changeLock(!lockEnabled);
    if(button === "{shift}") this.changeLock(false);

    if(button === "{lang}") this.handleLang();
  };

  getLang = () => {
    const map = {
      'en': 'ENG',
      'ru': 'РУС',
      'uk': 'УКР',
    };
    return map[this.state.language]
  };

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
            "{lang}": `${this.getLang()}`
          }}
          layout={{
            default_en: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / @ {lang}",
              "{space}"
            ],
            shift_en: [
              '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
              '{tab} Q W E R T Y U I O P { } |',
              '{lock} A S D F G H J K L : " {enter}',
              '{shift} Z X C V B N M < > ? @ {lang}',
              "{space}",
            ],
            default_ru: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} й ц у к е н г ш щ з х ъ \\",
              "{lock} ф ы в а п р о л д ж э {enter}",
              "{shift} я ч с м и т ь б ю / @ {lang}",
              "{space}"
            ],
            shift_ru: [
              '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
              '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |',
              '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
              '{shift} Я Ч С М И Т Ь Б Ю ? @ {lang}',
              "{space}",
            ],
            default_uk: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} й ц у к е н г ш щ з х ї \\",
              "{lock} ф і в а п р о л д ж є {enter}",
              "{shift} я ч с м и т ь б ю / @ {lang}",
              "{space}"
            ],
            shift_uk: [
              '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
              '{tab} Й Ц У К Е Н Г Ш Щ З Х Ї |',
              '{lock} Ф І В А П Р О Л Д Ж Є {enter}',
              '{shift} Я Ч С М И Т Ь Б Ю ? @ {lang}',
              "{space}",
            ],
          }}
          layoutName={this.getLayout()}
          ref={r => {this.props.onRef && this.props.onRef(r)}}
          onKeyPress={this.onKeyPress}
          {...this.props}
        />
      );
  }
}

const mapStateToProps = state => ({
  keyboardLanguage: state.keyboardState,
});

export default connect(mapStateToProps)(Keyboard)
