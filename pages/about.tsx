import Mdloader from "@components/Mdloader";
import { Table, Pane } from "evergreen-ui";
export default function About() {
  const donates = [
    {
      name: 'Buy me a coffee',
      src: '/static/bmc_qr.png',
      url: 'https://www.buymeacoffee.com/icai',
    },
    {
      name: "Paypal",
      src: "/static/paypel.png",
      url: "https://www.paypal.com/paypalme/icai",
    },
    {
      name: "Alipay",
      src: "/static/alipay.png",
    },
    {
      name: "Wechat",
      src: "/static/wechat.png",
    },
  ];
  return (
    <div>
      <Mdloader></Mdloader>
      <h3 id="donate" className="donate">
        Donate
      </h3>
      <p>
        If you find this website useful, you can buy me a coffee or donate to
        me. Thank you very much!
      </p>
      <Table className="donate-table">
        <Table.Body>
          <Table.Row height="auto">
            {donates.map((item) => (
              <Table.Cell key={item.name} height="230px">
                <Pane>
                  <Pane><img src={item.src} width="200" /></Pane>
                  <Pane textAlign="center" color="#000">
                  {item.url ? <a  href={item.url} target="_blank">
                    {item.name}
                  </a> : <span>{item.name}</span>}
                  </Pane>
                </Pane>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
      <style>{`
        .donate {
          padding-left: 10px;
          border-left: 3px solid #ccc;
        }
        .donate-table,
        .donate-table a {
          color: #000;
        }
      `}</style>
    </div>
  );
}

About.title = "About W3cubTools";
