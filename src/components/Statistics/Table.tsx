import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRespSqueezy } from "../../api/api";
import { getStatistics, resetItems } from "../../store/statisticsReducer";
import { RootState, useAppDispatch } from "../../store/store";
import Item from "./Item";

interface IProps {
  items: IRespSqueezy[];
}

const FilterForTable: FC<IProps> = ({ items }) => {
  const [id, setId] = useState("");
  const [short, setShort] = useState("");
  const [target, setTarget] = useState("");
  const [counter, setCounter] = useState("");

  const filterItems = () => {
    let array = [...items];
    if (id) array = array.filter((item) => String(item.id).includes(id));
    if (short)
      array = array.filter((item) =>
        item.short.toLowerCase().includes(short.toLowerCase())
      );
    if (target)
      array = array.filter((item) =>
        item.target.toLowerCase().includes(target.toLowerCase())
      );
    if (counter)
      array = array.filter((item) => String(item.counter).includes(counter));
    return array;
  };

  return (
    <tbody>
      <tr>
        <td>
          <input
            placeholder="filter"
            value={id}
            onChange={({ target: { value } }) => {
              setId(value);
            }}
          />
        </td>
        <td>
          <input
            placeholder="filter"
            value={short}
            onChange={({ target: { value } }) => {
              setShort(value);
            }}
          />
        </td>
        <td>
          <input
            placeholder="filter"
            style={{ width: "300px" }}
            value={target}
            onChange={({ target: { value } }) => {
              setTarget(value);
            }}
          />
        </td>
        <td>
          <input
            placeholder="filter"
            value={counter}
            onChange={({ target: { value } }) => {
              setCounter(value);
            }}
          />
        </td>
      </tr>
      {filterItems().map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </tbody>
  );
};

const Table: FC = () => {
  const offset = useRef<number>(0);
  const [sortTag, setSortTag] = useState("");
  const { items, isFetch } = useSelector(
    (state: RootState) => state.statistics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatistics(offset.current));
    return () => {
      dispatch(resetItems());
    };
  }, []);

  const sortItems = () => {
    let array = [...items];
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

  const color = (clr: string) =>
    sortTag === clr ? { color: "green" } : { color: "black" };

  return (
    <>
      <div>
        {isFetch ? (
          <div>LOADING...</div>
        ) : items.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th style={color("id")} onClick={() => setSortTag("id")}>
                  id
                </th>
                <th style={color("short")} onClick={() => setSortTag("short")}>
                  short
                </th>
                <th
                  style={color("target")}
                  onClick={() => setSortTag("target")}
                >
                  target
                </th>
                <th
                  style={color("counter")}
                  onClick={() => setSortTag("counter")}
                >
                  counter
                </th>
              </tr>
            </thead>
            <FilterForTable items={sortItems()} />
          </table>
        ) : (
          <div>No links</div>
        )}
      </div>
      <button
        disabled={isFetch}
        onClick={() => {
          offset.current += 40;
          dispatch(getStatistics(offset.current));
        }}
      >
        LOAD MORE
      </button>
    </>
  );
};

export default Table;
