import React from "react";

export interface IParagraph {
  __html: string;
  classes: string;
}

const Paragraph = ({__html, classes}: IParagraph) => (
  <p className={classes} dangerouslySetInnerHTML={{__html}} />
)

export default Paragraph;