import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [list, setList] = useState(new Array(1000).fill(""));
  const newList = list.map((item, index) => index);
  const [visibleList, setVList] = useState([]);
  const [scrollTop, setTop] = useState(0);
  const t = useRef(null);
  const height = 400;
  const itemHeight = 30;
  const contentHeight = list.length * itemHeight + "px";
  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    renderList(scrollTop);
  };
  const renderList = (scrollTop) => {
    var listNum = Math.ceil(height / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + listNum;
    setVList(newList.slice(startIndex, endIndex));
    t.current.style.webkitTransform = `translate3d(0, ${
      startIndex * itemHeight
    }px, 0)`;
  };
  useEffect(() => {
    renderList(0);
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="list-view" onScroll={onScroll}>
        <div
          style={{ height: contentHeight }}
          className="list-view-phantom "
        ></div>
        <div ref={t} className="list-view-content ">
          {visibleList.map((item, index) => (
            <div className="list-view-item ">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
