import React from "react";

import "./loading.scss";

const Loading: React.FC<{}> = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__spinner" />
        <div className="loading__label">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
