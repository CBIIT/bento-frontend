import React, { useRef } from "react";

const ShutdownBanner = (props) => {
  const includeHtmlRef = useRef(null);
  const { src } = props;

  return (
    <div>
      {/* include-html component */}
      <include-html
        ref={includeHtmlRef}
        style={{
          // position: 'sticky',
          top: "0px",
          width: "100%",
          zIndex: "1000",
        }}
        src={src}
      />
    </div>
  );
};

export default ShutdownBanner;
