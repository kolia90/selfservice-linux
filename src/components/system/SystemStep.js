import React from "react";
import Header from "../shared/header/Header";
import { withRouter } from "react-router-dom";
import PreviousPage from "../shared/previous-page/PreviousPage";
import MultiLang from "../../MultiLang";

class SystemStep extends React.Component {

  navPrev = () => {
    if(this.props.navPrev){
      this.props.navPrev()
    }else{
      this.props.history.goBack();
    }
  };

  render() {
    return (
        <>
          <Header
              left={<PreviousPage onClick={() => this.navPrev()} />}
              center={<div>{this.props.title || (
                  <MultiLang>
                    {{
                      uk: "Системне меню",
                      ru: "Системное меню",
                      en: "System menu"
                    }}
                  </MultiLang>
              )}</div>}
              right={null}
          />
          <div className="wrapper-system">{this.props.children}</div>
        </>
    );
  }
}

export default withRouter(SystemStep);
