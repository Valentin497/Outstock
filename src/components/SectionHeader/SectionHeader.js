import React from "react";

import "./SectionHeader.scss";

export const SectionHeader = ({
  title,
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, ipsa.",
}) => {
  return (
    <div className="my-5">
      <div className="d-flex flex-row align-items-center">
        <div className="border section-header-separator" />
        <h4 className="px-2 text-center">{title}</h4>
        <div className="border section-header-separator" />
      </div>
      <h6 className="text-muted w-100 text-center ">{description}</h6>
    </div>
  );
};
