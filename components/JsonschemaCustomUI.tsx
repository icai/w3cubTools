import React, { Fragment, Component } from "react";
import {
  Pane,
  Button,
  Textarea,
  Select,
  Checkbox,
  TextInput
} from "evergreen-ui";

export class KeyValueComponent extends React.Component<any, any> {
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

export function ArrayField(props) {
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

export function InputField(props) {
  return (
    <TextInput
      width={"100%"}
      value={props.value}
      required={props.required}
      onChange={event => props.onChange(event.target.value)}
    />
  );
}

export function CheckboxField(props) {
  return (
    <Checkbox
      label={props.label}
      checked={props.value}
      onChange={() => props.onChange(!props.value)}
    />
  );
}

export function SelectField(props) {
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

export function TextAreaField(props) {
  return (
    <Textarea
      className="custom"
      value={props.value}
      required={props.required}
      onChange={event => props.onChange(event.target.value)}
    />
  );
}
