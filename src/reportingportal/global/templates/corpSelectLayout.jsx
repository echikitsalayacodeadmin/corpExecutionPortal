import React, { Fragment, useContext } from "react";
import SelectCorpIndex from "../../modules/selectCorp/selectCorpIndex";
import { CorpNameContext } from "../context/context";

const CorpSelectLayout = ({ children }) => {
  const { corpId } = useContext(CorpNameContext);

  if (!corpId) {
    return (
      <Fragment>
        <SelectCorpIndex />
      </Fragment>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export default CorpSelectLayout;
