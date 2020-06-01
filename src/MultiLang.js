import React from "react";
import {Determinator} from "react-multi-language"

function MultiLang({children}) {
  return (
      <Determinator>{children}</Determinator>
  );
}

export default MultiLang;
