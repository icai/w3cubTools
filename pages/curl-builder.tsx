// <script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>

import React, { Fragment, Component } from "react";
import {
  Pane,
  Button,
  Textarea,
  Select,
  Checkbox,
  TextInput
} from "evergreen-ui";
import Form from "react-jsonschema-form";
import Head from "next/head";

class KeyValueComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    console.info(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    return event => {
      this.setState(
        {
          [name]: event.target.value
        },
        () => this.props.onChange(this.state)
      );
    };
  }

  render() {
    const { key, value } = this.state;
    return (
      <div style={{ marginRight: "100px" }}>
        <TextInput
          placeholder="key"
          marginRight={20}
          width={"40%"}
          value={key}
          onChange={this.onChange("key")}
        />
        <TextInput
          placeholder="value"
          value={value}
          width={"40%"}
          onChange={this.onChange("value")}
        />
      </div>
    );
  }
}

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
      "ui:widget": SelectFieldTemplate
    },
    endpoint: {
      "ui:widget": InputFieldTemplate
    },
    data: {
      "ui:widget": TextAreaFieldTemplate
    },
    headers: {
      "ui:ArrayFieldTemplate": ArrayFieldTemplate,
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

function DefaultArrayItem(props) {
  return (
    <div key={props.key} className={props.className}>
      {props.hasRemove && (
        <Button
          appearance="primary"
          intent="danger"
          className="pull-right"
          disabled={props.disabled || props.readonly}
          onClick={props.onDropIndexClick(props.index)}
        >
          Remove
        </Button>
      )}
      {props.children}
    </div>
  );
}

function ArrayFieldTemplate(props) {
  return (
    <div>
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {props.title}
      </div>
      {props.items.map(DefaultArrayItem)}
      {props.canAdd && (
        <div className="text-right">
          <Button appearance="primary" onClick={props.onAddClick}>
            Add
          </Button>
        </div>
      )}
    </div>
  );
}

function InputFieldTemplate(props) {
  const width = !~["key", "value"].indexOf(props.label) ? "100%" : "auto";
  return (
    <TextInput
      width={width}
      value={props.value}
      required={props.required}
      onChange={event => props.onChange(event.target.value)}
    />
  );
}

function CheckboxFieldTemplate(props) {
  return (
    <Checkbox
      label={props.label}
      checked={props.value}
      onChange={() => props.onChange(!props.value)}
    />
  );
}

function SelectFieldTemplate(props) {
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder
  } = props;
  const { enumOptions, enumDisabled } = options;
  const emptyValue = multiple ? [] : "";
  return (
    <Select
      width="100%"
      value={typeof value === "undefined" ? emptyValue : value}
      onChange={event => props.onChange(event.target.value)}
    >
      {enumOptions.map(({ value, label }, i) => {
        const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
        return (
          <option key={i} value={value} disabled={disabled}>
            {label}
          </option>
        );
      })}
    </Select>
  );
}

function TextAreaFieldTemplate(props) {
  return (
    <Textarea
      className="custom"
      value={props.value}
      required={props.required}
      onChange={event => props.onChange(event.target.value)}
    />
  );
}

const customWidgets = { CheckboxWidget: CheckboxFieldTemplate };
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
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            widgets={customWidgets}
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
      </Fragment>
    );
  }
}
