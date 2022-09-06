import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRespSqueezy } from "../../api/api";
import { getStatistics } from "../../store/statisticsReducer";
import { RootState, useAppDispatch } from "../../store/store";
import Item from "./Item";


const Table: FC = () => {
  const offset = useRef<number>(0);
  const [sortTag, setSortTag] = useState("");
  const { items, isFetch } = useSelector(
    (state: RootState) => state.statistics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatistics(offset.current));
  }, []);

  const processingItems = () => {
    const array = [...items];
    sortTag === "id" &&
      array.sort((a: IRespSqueezy, b: IRespSqueezy) => a.id - b.id);
    sortTag === "short" &&
      array.sort((a: IRespSqueezy, b: IRespSqueezy) =>
        a.short.toLowerCase().localeCompare(b.short.toLowerCase())
      );
    sortTag === "target" &&
      array.sort((a: IRespSqueezy, b: IRespSqueezy) =>
        a.target.toLowerCase().localeCompare(b.target.toLowerCase())
      );
    sortTag === "counter" &&
      array.sort((a: IRespSqueezy, b: IRespSqueezy) => b.counter - a.counter);
    return array;
  };

  const color = (clr: string) => sortTag === clr ? {color: 'green'} : {color: 'black'}

  return (
    <>
      <div>
        {isFetch ? (
          <div>LOADING...</div>
        ) : items.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th style={color('id')} onClick={() => setSortTag("id")}>id</th>
                <th style={color('short')} onClick={() => setSortTag("short")}>short</th>
                <th style={color('target')} onClick={() => setSortTag("target")}>target</th>
                <th style={color('counter')} onClick={() => setSortTag("counter")}>counter</th>
              </tr>
            </thead>
            <tbody>
              {processingItems().map((item) => (
                <Item key={item.id} {...item} />
              ))}
            </tbody>
          </table>
        ) : <div>No links</div>}
      </div>
      {items.length > 0 && items.length % 40 === 0 && (
        <button
          disabled={isFetch}
          onClick={() => {
            offset.current += 40;
            dispatch(getStatistics(offset.current));
          }}
        >
          LOAD MORE
        </button>
      )}
    </>
  );
};

export default Table;
