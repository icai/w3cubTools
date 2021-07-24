import Mdloader from "@components/Mdloader";
import entities from "@constants/entities.json";

export default function HtmlEntities() {
  return (
    <>
      <table className="entitles">
        <tbody>
          {entities.map((item, ix) => {
            return (
              <tr
                key={ix}
                title={item.title}
                data-block={item.block}
                data-category={item.category}
                data-set={item.set}
              >
                <td
                  className="character"
                  dangerouslySetInnerHTML={{ __html: "&" + item.dec + ";" }}
                ></td>
                <td className="named">
                  <code>
                    {item.entities.map(it => "&" + it + ";").join(" ")}
                  </code>
                </td>
                <td className="hex">
                  <code>&amp;{item.hex};</code>
                </td>
                <td className="dec">
                  <code>&amp;{item.dec};</code>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Mdloader />
      <style jsx global>{`
        table.entitles {
          font: 0.8em Monaco;
          display: block;
          text-align: center;
          tr {
            background: #eee;
            display: inline-block;
            text-align: center;
            width: 9.5em;
            height: 9.5em;
            margin: 0.5em;
            padding: 1px;
            position: relative;
          }
          td {
            display: block;
          }
          .character {
            font: 4em "Georgia", "Apple Symbols", serif;
            line-height: 1.1;
          }
          .hex,
          .dec {
            visibility: hidden;
          }
          .desc {
            display: none;
            position: absolute;
            text-align: center;
            background: silver;
            color: black;
          }
          tr:hover .character {
            font-size: 2em;
          }
          tr:hover .hex,
          tr:hover .dec {
            visibility: visible;
          }
          xtr:hover .desc {
            display: block;
            top: 100%;
            left: 0;
          }
        }
      `}</style>
    </>
  );
}
