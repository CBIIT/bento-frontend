/* eslint-disable */
import React from 'react';
import {
  Grid, Button
} from '@material-ui/core';
import NavbarLink from './NavbarLink';
import PDFDownloadIconSvg from './PDFDownloadSvg';

const NavBarDropdown = ({
  clickedTitle, HeaderSubLinks, setClickedTitle, classes,
}) => {
  if (!clickedTitle) return null;

  return (
    <div className={classes.dropdown}>
      <div className="dropdownListWrapper">
        <Grid container className={classes.nameDropdownContainer}>
          {HeaderSubLinks[clickedTitle]?.map((dropItem) => {
            if (dropItem.link) {
              return (
                <Grid item xs={3} key={dropItem.id} className="gridItem">
                  <ul className="dropdownList">
                    <li className="dropdownListItem">
                      <div id={dropItem.id} className="dropdownItem dropdownTitle">
                        <NavbarLink
                          item={dropItem}
                          onItemClick={() => setClickedTitle("")}
                        />
                        {dropItem?.items?.length > 0 && (
                          <ul className="dropdownSubItemList">
                            {dropItem.items.map((item) => (
                              <li key={"dropdown-sub-item-" + item?.id}>
                                <NavbarLink
                                  item={item}
                                  icon={dropItem?.isPdfDownload && <PDFDownloadIconSvg />}
                                  className="dropdownSubItem"
                                  onItemClick={() => setClickedTitle("")}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  </ul>
                </Grid>
              );
            }
            if (dropItem.onClick) {
              return (
                <Grid item xs={3} key={dropItem.id} className="gridItem">
                  <ul className="dropdownList">
                    <li className="dropdownListItem">
                      <Button
                        id={dropItem.id}
                        className="dropdownItem dropdownItemButton"
                        onClick={dropItem.onClick}
                      >
                        {dropItem.name}
                      </Button>
                    </li>
                  </ul>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </div>
    </div>
  );
};

export default NavBarDropdown;
