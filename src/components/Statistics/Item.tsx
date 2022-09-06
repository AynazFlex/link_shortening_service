import { FC, memo } from "react";
import { IRespSqueezy } from "../../api/api";

const Item: FC<IRespSqueezy> = ({ id, short, target, counter }) => {
  return (
    <tr>
      <td>{id}</td>
      <td style={{ cursor: 'pointer' }} onClick={() => {
        const text = `http://79.143.31.216/s/${short}`
        navigator.clipboard.writeText(text).then(() => alert('Copy'))
      }}>{short}</td>
      <td>{target}</td>
      <td>{counter}</td>
    </tr>
  );
};

export default memo(Item);
