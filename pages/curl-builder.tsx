// <script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>

import React, { Fragment, Component } from "react";
import { Pane } from "evergreen-ui";
import Form from "react-jsonschema-form";
import Head from "next/head";

const schema = {
  schema: {
    title: "Online curl command line builder",
    type: "object",
    properties: {
      method: {
        type: "string",
        title: "HTTP Method",
        default: "GET",
        enum: ["GET", "POST", "PUT", "PATCH", "DELETE"]
      },
      endpoint: {
        type: "string",
        title: "URL"
      },
      data: {
        type: "string",
        title: "Body"
      },
      headers: {
        type: "array",
        title: "A list of custom header",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string"
            },
            value: {
              type: "string"
            }
          }
        }
      },
      json: {
        type: "boolean",
        title: "JSON Content-Type"
      },
      insecure: {
        type: "boolean",
        title: "Accept self-signed certs"
      },
      verbose: {
        type: "boolean",
        title: "Verbose"
      }
    }
  },
  uiSchema: {
    method: {
      "ui:widget": "select"
    },
    data: {
      "ui:widget": "textarea"
    },
    headers: {
      "ui:options": {
        orderable: false
      },
      "ui:emptyValue": [],
      items: {
        key: {
          "ui:placeholder": "key",
          "ui:title": false
        },
        value: {
          "ui:title": false,
          "ui:placeholder": "value"
        }
      }
    }
  },
  formData: {
    endpoint: "https://github.com/"
  }
};

export default class extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      result: "curl ",
      ...schema
    };
  }
  getResult = ({ formData }) => {
    const {
      headers,
      verbose,
      insecure,
      method,
      json,
      data,
      endpoint
    } = formData;
    const getHeadersString = () => {
      if (!headers) {
        return "";
      }
      var result = "";
      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        if (
          header.key &&
          header.key.length > 0 &&
          header.value &&
          header.value.length > 0
        )
          result += " -H '" + header.key + ": " + header.value + "'";
      }
      return result;
    };
    const result = `curl${verbose ? " -v" : ""}${
      insecure ? " --insecure" : ""
    }${method ? " -X" + method : ""}${getHeadersString()}${
      json ? ' -H "Content-type: application/json"' : ""
    }${data ? " -d '" + data + "'" : ""} ${
      endpoint ? "'" + endpoint + "'" : ""
    }`;
    this.setState({
      result,
      formData
    });
  };
  onSelect = (event: any) => {
    event.target.select();
  };
  render() {
    const log = type => console.log.bind(console, type);
    const { result, schema, uiSchema, formData } = this.state;
    return (
      <Fragment>
        <style jsx>
          {`
            .rt-from fieldset {
              padding: 0;
            }
            .rt-from legend {
              font-size: 20px;
            }
          `}
        </style>
        <Pane
          className="rt-from"
          display="block"
          css={{
            width: "100%",
            padding: "0px 50px",
            margin: "auto"
          }}
        >
          <Form
            className="rt-from"
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={this.getResult}
            onError={log("errors")}
          >
            <textarea
              className="form-control"
              rows={6}
              placeholder="result"
              value={result}
              onChange={() => {}}
              onClick={this.onSelect}
              style={{ fontSize: "20px" }}
            />
          </Form>
        </Pane>
      </Fragment>
    );
  }
}
