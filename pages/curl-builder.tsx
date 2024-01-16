import React, { Fragment, Component } from "react";
import { Pane, Textarea } from "evergreen-ui";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";
import {
  KeyValueComponent,
  ArrayField,
  CheckboxField,
  InputField,
  SelectField,
  TextAreaField
} from "@components/JsonschemaCustomUI";

import Mdloader from "@components/Mdloader";

const schema: RJSFSchema = {
  schema: {
    // title: "Online curl command line builder",
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
        title: "Custom headers",
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
      "ui:widget": SelectField
    },
    endpoint: {
      "ui:widget": InputField
    },
    data: {
      "ui:widget": TextAreaField
    },
    headers: {
      "ui:ArrayFieldTemplate": ArrayField,
      "ui:options": {
        orderable: false
      },
      "ui:emptyValue": [],
      items: {
        "ui:field": KeyValueComponent,
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

const customWidgets = { CheckboxWidget: CheckboxField };
export default class CurlBuilder extends Component<any, any> {
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
    const { result, schema, uiSchema, formData } = this.state;
    return (
      <Fragment>
        <Pane
          display="block"
          css={{
            width: "780px",
            padding: "0px 50px",
            margin: "auto"
          }}
        >
          <h1>Online curl command line builder</h1>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            widgets={customWidgets}
            validator={validator}
            onChange={this.getResult}
          >
            <fieldset>
              <Textarea
                height={"100px"}
                placeholder="result"
                value={result}
                onChange={() => {}}
                onClick={this.onSelect}
                style={{ fontSize: "20px" }}
              />
            </fieldset>
          </Form>
        </Pane>
        <Mdloader />
      </Fragment>
    );
  }
}
