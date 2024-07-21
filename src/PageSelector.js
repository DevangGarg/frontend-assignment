import React, { useState } from "react";
import "./PageSelector.css";

const PageSelector = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPages, setSelectedPages] = useState({
    page1: false,
    page2: false,
    page3: false,
    page4: false,
  });
  const [submittedPages, setSubmittedPages] = useState([]);


  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedPages({
      page1: newSelectAll,
      page2: newSelectAll,
      page3: newSelectAll,
      page4: newSelectAll,
    });
  };

  const handlePageChange = (page) => {
    setSelectedPages((prevSelectedPages) => {
      const newSelectedPages = {
        ...prevSelectedPages,
        [page]: !prevSelectedPages[page],
      };
      setSelectAll(
        Object.values(newSelectedPages).every((isSelected) => isSelected)
      );
      return newSelectedPages;
    });
  };

  const handleDone = () => {
    const selected = Object.keys(selectedPages).filter((page) => selectedPages[page]);
    setSubmittedPages(selected);
  };

  return (
    <div className="page-selector-container">
      <div className="page-selector-item">
        <label className="all-pages">All pages</label>
        <input type="checkbox" className="checkbox" checked={selectAll} onChange={handleSelectAll} />
      </div>
      <hr />
      {Object.keys(selectedPages).map((page, index) => (
        <div className="page-selector-item" key={index}>
          <label className="all-pages">
            {page.charAt(0).toUpperCase() +
              page.slice(1, 4) + ' ' + page.charAt(4)}
          </label>
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedPages[page]}
            onChange={() => handlePageChange(page)}
          />
        </div>
      ))}
      <hr />
      <button className="done-button" onClick={handleDone}>Done</button>
      {submittedPages.length > 0 ? (
        <div className="selected-pages">
          <h3>Selected Pages:</h3>
          <ul>
            {submittedPages.map((page, index) => (
              <li key={index} className="all-pages">{page.charAt(0).toUpperCase() +
                page.slice(1, 4) + ' ' + page.charAt(4)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h6>Any page is not selected for now. Select the pages and then click on Done button to display selected pages.</h6>
      )}
    </div>
  );
};

export default PageSelector;
