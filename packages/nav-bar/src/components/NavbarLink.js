/* eslint-disable */
import React from 'react';
import {
  Link
} from "react-router-dom";

const NavbarLink = ({
  item, icon, className, onItemClick
}) => {
  if (!item || !item.link) return null;

  const isExternal =
    item.link.startsWith("https://") || item.link.endsWith(".pdf");

  return (
    <>
      {isExternal ? (
        <a
          target="_blank"
          id={item.id}
          href={item.link}
          rel="noopener noreferrer"
          className={className || "dropdownItem"}
          onClick={onItemClick}
        >
          {item.name}
          {item.text && <div className="dropdownItemText">{item.text}</div>}
        </a>
      ) : (
        <Link
          target="_self"
          id={item.id}
          to={item.link}
          className={className || "dropdownItem"}
          onClick={onItemClick}
        >
          {item.name}
          {item.text && <div className="dropdownItemText">{item.text}</div>}
        </Link>
      )}
      {icon}
    </>
  );
};

export default NavbarLink;
