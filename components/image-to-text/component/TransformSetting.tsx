import React, { ReactNode } from "react";

interface TransformSettingProps {
  label?: string;
  labelFor?: string;
  children?: ReactNode;
}

class TransformSetting extends React.PureComponent<TransformSettingProps> {
  static defaultProps: TransformSettingProps = {
    label: "",
    labelFor: ""
  };

  render() {
    const { label, labelFor, children } = this.props;

    return (
      <div className="transform-setting">
        {label ? <label htmlFor={labelFor}>{label}</label> : null}
        {children}
      </div>
    );
  }
}

export default TransformSetting;
