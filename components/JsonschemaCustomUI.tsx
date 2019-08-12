import React, {
  Fragment,
  Component,
  useEffect,
  useReducer,
  useState
} from "react";
import {
  Pane,
  TagInput,
  SearchInput,
  Button,
  Textarea,
  Select,
  Checkbox,
  TextInput
} from "evergreen-ui";
import { useDropzone } from "react-dropzone";

export class KeyValueComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
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
    const props = this.props;
    return (
      <div style={{ marginRight: "100px" }}>
        <TextInput
          placeholder={props.uiSchema["key"]["ui:placeholder"]}
          marginRight={20}
          width={"40%"}
          value={key}
          onChange={this.onChange("key")}
        />
        <TextInput
          placeholder={props.uiSchema["value"]["ui:placeholder"]}
          value={value}
          width={"40%"}
          onChange={this.onChange("value")}
        />
      </div>
    );
  }
}

export function KeyValueComponent2(props) {
  const [state, setState] = useReducer((state, action) => {
    return {
      ...state,
      ...action
    };
  }, props.formData);
  const onChange = name => {
    return event => {
      setState({
        [name]: event.target.value
      });
    };
  };
  useEffect(() => {
    props.onChange(state);
  }, [state]);
  let keys = Object.keys(props.uiSchema);
  keys = keys.filter(item => !(item == "classNames" || item == "ui:field"));
  return (
    <div style={{ marginRight: "100px" }}>
      {keys.map(item => (
        <TextInput
          key={item}
          placeholder={props.uiSchema[item]["ui:placeholder"] || item}
          marginRight={20}
          width={"40%"}
          value={state[item]}
          onChange={onChange(item)}
        />
      ))}
    </div>
  );
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
      placeholder={props.placeholder}
      height={props.options && props.options.height}
      onFocus={event => event.target.select()}
      onChange={event => props.onChange(event.target.value)}
    />
  );
}

export function TagInputField(props) {
  let values = [];
  if (typeof props.value == "string") {
    if (props.value) {
      values = props.value.split(",");
    }
  }
  return (
    <TagInput
      width={"100%"}
      values={values}
      required={props.required}
      inputProps={{ placeholder: props.placeholder }}
      height={props.options && props.options.height}
      onChange={(values: any) => {
        console.log(values);
        props.onChange(values.join(", "));
      }}
    />
  );
}

export function SearchInputField(props) {
  return (
    <SearchInput
      width={"100%"}
      value={props.value}
      required={props.required}
      placeholder={props.placeholder}
      height={props.options && props.options.height}
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
  const usecount = props.options && props.options.count;
  const [count, setCount] = useState((props.value || "").length);
  return (
    <div style={{ position: "relative" }}>
      <Textarea
        className="custom"
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        onChange={event => {
          usecount && setCount(event.target.value.length);
          props.onChange(event.target.value);
        }}
        onFocus={event => event.target.select()}
      />
      {usecount ? (
        <span style={{ position: "absolute", right: "10px", bottom: "10px" }}>
          {count}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", `;name=${encodeURIComponent(name)};base64`);
}

function processFile(file) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = event => {
      resolve({
        // @ts-ignore
        dataURL: addNameToDataURL(event.target.result, name),
        name,
        size,
        type
      });
    };
    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

export function FileField(props) {
  const { multiple, onChange, options } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: multiple,
    accept: options.accept || "*"
  });
  const [preview, setPreview] = useState("");
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  useEffect(() => {
    processFiles(acceptedFiles).then(filesInfo => {
      const state = {
        // @ts-ignore
        values: filesInfo.map(fileInfo => fileInfo.dataURL),
        filesInfo
      };
      if (multiple) {
        onChange(state.values);
      } else {
        onChange(state.values[0]);
        setPreview(state.values[0]);
      }
    });
  }, [acceptedFiles]);
  return (
    <div className="ibox-section" style={{ width: options.width }}>
      <section className="dragcontainer">
        <div
          style={{
            backgroundImage: `url(${preview})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          className="dropzone"
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {multiple && (
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        )}
      </section>
      <style jsx global>{`
        .ibox-section {
          padding: 16px;
          border: 1px #e8e8e8 solid;
          border-radius: 3px;
          width: 100%;
        }
        .dragcontainer {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }

        .dragcontainer > p {
          font-size: 1rem;
        }

        .dragcontainer > em {
          font-size: 0.8rem;
        }

        .dragcontainer .dropzone {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 70px;
          border-width: 5px;
          border-radius: 2px;
          border-color: #eeeeee;
          border-style: dashed;
          background-color: #fafafa;
          color: #bdbdbd;
          outline: none;
          transition: border 0.24s ease-in-out;
        }

        .dragcontainer .dropzone:focus {
          border-color: #2196f3;
        }

        .dragcontainer .dropzone.disabled {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
