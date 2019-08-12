// <script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>

import React, { Fragment, Component, useReducer } from "react";
import { Pane, Textarea, SideSheet, Button } from "evergreen-ui";
import Form from "react-jsonschema-form";
import {
  KeyValueComponent,
  ArrayField,
  CheckboxField,
  InputField,
  TagInputField,
  SelectField,
  SearchInputField,
  TextAreaField,
  FileField
} from "@components/JsonschemaCustomUI";
import Mdloader from "@components/Mdloader";
import "@styles/meta.less";

const rootSchema = {
  schema: {
    type: "object",
    properties: {
      url: {
        type: "string",
        title: "Site Url"
      },
      title: {
        type: "string",
        title: "Site Title"
      },
      description: {
        type: "string",
        title: "Site Description"
      },
      author: {
        type: "string",
        title: "Site Author"
      },
      keywords: {
        type: "string",
        title: "Site Keywords"
      },
      viewport: {
        type: "string",
        title: "Viewport"
      },
      ua: {
        type: "string",
        title: "X-UA-Compatible"
      },
      image: {
        type: "string",
        format: "data-url",
        title: "Social Share Image ( Facebook, Twitter ... )"
      },
      metas: {
        type: "array",
        title: "Custom Meta Tags",
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
      }
    }
  },
  uiSchema: {
    url: {
      "ui:widget": InputField,
      "ui:placeholder": "Site url",
      "ui:height": 40
    },
    title: {
      "ui:widget": InputField,
      "ui:placeholder": "Title must be within 70 Characters",
      "ui:height": 40
    },
    description: {
      "ui:widget": TextAreaField,
      "ui:placeholder": "Description must be within 150 Characters",
      // "ui:height": 40,
      "ui:count": true
    },
    author: {
      "ui:widget": InputField,
      "ui:placeholder": "Website author",
      "ui:height": 40
    },
    keywords: {
      "ui:widget": TagInputField,
      "ui:placeholder": "keywords1, keywords2, keywords3",
      "ui:height": 40
    },
    viewport: {
      "ui:widget": InputField,
      "ui:placeholder": "meta content",
      "ui:height": 40
    },
    ua: {
      "ui:widget": InputField,
      "ui:placeholder": "meta content",
      "ui:height": 40
    },
    image: {
      "ui:options": {
        accept: "image/*"
      }
    },
    metas: {
      "ui:ArrayFieldTemplate": ArrayField,
      "ui:options": {
        orderable: false
      },
      "ui:emptyValue": [],
      items: {
        "ui:field": KeyValueComponent,
        key: {
          "ui:placeholder": "name",
          "ui:height": 40,
          "ui:title": false
        },
        value: {
          "ui:title": false,
          "ui:height": 40,
          "ui:placeholder": "content"
        }
      }
    }
  },
  formData: {
    title:
      "W3cubTools | all free, collections of tools for developers and family",
    description:
      "Provide tools for developers and their family, to improve using HTML, Meta Tag, React, CSS, JavaScript, Color, SQL, SVG, GraphQL, JSON, Chinese, Japanese, Math and Game skills.",
    viewport: "width=device-width, initial-scale=1.0",
    ua: "IE=edge,chrome=1",
    keywords: "",
    url: "https://tools.w3cub.com/",
    author: "W3cubTools"
  }
};

const customWidgets = { CheckboxWidget: CheckboxField, FileWidget: FileField };

export default function() {
  const [state, setState] = useReducer(
    (state, action) => {
      return {
        ...state,
        ...action
      };
    },
    { ...rootSchema, isShown: false }
  );

  const getHeadersString = () => {
    if (!formData.metas) {
      return "";
    }
    var result = "";
    for (var i = 0; i < formData.metas.length; i++) {
      var header = formData.metas[i];
      if (
        header.key &&
        header.key.length > 0 &&
        header.value &&
        header.value.length > 0
      )
        result += `<meta name="${header.key}" content="${header.value}">\n`;
    }
    return result;
  };
  const getResult = ({ formData }) => {
    const result = `
    <meta charset="utf-8" />
    <title>${formData.title}</title>
    <meta name="title" content="${formData.title}" />
    <meta name="description" content="${formData.description}" />
    ${formData.keywords &&
      `<meta name="keywords" content="${formData.keywords}" />`}
    ${formData.ua &&
      `<meta http-equiv="X-UA-Compatible" content="${formData.ua}" />`}
    ${formData.author && `<meta name="author" content="${formData.author}" />`}
    ${formData.viewport &&
      `<meta name="viewport" content="${formData.viewport}" />`}
    <meta name="renderer" content="webkit" />
    ${getHeadersString()}

    <meta property="og:type" content="website"/>
    <meta property="og:url" content="${formData.url}"/>
    <meta property="og:title" content="${formData.title}"/>
    <meta property="og:description" content="${formData.description}"/>
    <meta property="og:image" content="https://tools.w3cub.com/assets/meta-tag-logo.png"/>

    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content="${formData.url}"/>
    <meta property="twitter:title" content="${formData.title}"/>
    <meta property="twitter:description" content="${formData.description}"/>
    <meta property="twitter:image" content="https://tools.w3cub.com/assets/meta-tag-logo.png"/>
    `;
    setState({
      result,
      formData
    });
  };
  const onSelect = (event: any) => {
    event.target.select();
  };

  const { result, schema, uiSchema, formData } = state;
  const formDataImage = formData.image || "/static/logo.png";

  const previewContent = () => {
    return (
      <div className="metadata-preview">
        <div className="metadata__content">
          <div id="google" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Google</span>
            </h4>
            <div className="meta-tag-google">
              <span className="meta-tag-google__title">{formData.title}</span>
              <div className="meta-tag-google__url">
                <span className="meta-tag-google__url-title ">
                  {formData.url}
                </span>
                <span className="meta-tag-google__url-arrow" />
              </div>
              <span className="meta-tag-google__description">
                {formData.description}
              </span>
            </div>
          </div>
          <div id="facebook" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Facebook</span>
            </h4>
            <div className="meta-tag-facebook">
              <div
                className="meta-tag-facebook__image"
                style={{
                  backgroundImage: "url(" + formDataImage + ")"
                }}
              />
              <div className="meta-tag-facebook__text">
                <span className="meta-tag-facebook__link ">{formData.url}</span>
                <div className="meta-tag-facebook__content">
                  <div style={{ marginTop: 5 }}>
                    <div className="meta-tag-facebook__title">
                      {formData.title}
                    </div>
                  </div>
                  <span className="meta-tag-facebook__description">
                    {formData.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="twitter" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Twitter</span>
            </h4>
            <div className="meta-tag-twitter">
              <div
                className="meta-tag-twitter__image"
                style={{
                  backgroundImage: "url(" + formDataImage + ")"
                }}
              />
              <div className="meta-tag-twitter__text">
                <span className="meta-tag-twitter__title">
                  {formData.title}
                </span>
                <span className="meta-tag-twitter__description">
                  {formData.description}
                </span>
                <span className="meta-tag-twitter__link ">{formData.url}</span>
              </div>
            </div>
          </div>
          <div id="linkedin" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Linkedin</span>
            </h4>
            <div className="meta-tag-linkedin">
              <div
                className="meta-tag-linkedin__image"
                style={{
                  backgroundImage: "url(" + formDataImage + ")"
                }}
              />
              <div className="meta-tag-linkedin__text">
                <div className="meta-tag-linkedin__content">
                  <div className="meta-tag-linkedin__title">
                    {formData.title}
                  </div>
                  <span className="meta-tag-linkedin__link ">
                    {formData.url}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="pinterest" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Pinterest</span>
            </h4>
            <div className="meta-tag-pinterest">
              <div className="meta-tag-pinterest__image">
                <img
                  id="pinterest-image"
                  className="js-preview-img"
                  src={formDataImage}
                />
              </div>
              <div className="meta-tag-pinterest__content">
                <div className="meta-tag-pinterest__title">
                  {formData.title}
                </div>
                <div className="meta-tag-pinterest__dots">
                  <div className="meta-tag-pinterest__dot" />
                  <div className="meta-tag-pinterest__dot" />
                  <div className="meta-tag-pinterest__dot" />
                </div>
              </div>
            </div>
          </div>
          <div id="slack" className="metadata-group">
            <h4 className="metadata-group__title">
              <span>Slack</span>
            </h4>
            <div className="meta-tag-slack">
              <div className="meta-tag-slack__bar" />
              <div className="meta-tag-slack__content">
                <div className="flex">
                  <img
                    className="meta-tag-slack__favicon"
                    src={formDataImage}
                  />{" "}
                  <span className="meta-tag-slack__link">
                    {formData.author}
                  </span>
                </div>
                <div className="meta-tag-slack__title">{formData.title}</div>
                <span className="meta-tag-slack__description">
                  {formData.description}
                </span>
                <div
                  className="meta-tag-slack__image"
                  style={{
                    backgroundImage: "url(" + formDataImage + ")"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <SideSheet
        isShown={state.isShown}
        onCloseComplete={() => setState({ isShown: false })}
      >
        {previewContent}
      </SideSheet>
      <Pane
        display="block"
        css={{
          width: "780px",
          padding: "0px 0px",
          margin: "auto"
        }}
      >
        <h1>Meta Tag Generator</h1>
        <Button
          marginTop={20}
          marginBottom={20}
          height={100}
          width="100%"
          fontSize="30px"
          display="block"
          onClick={() => {
            setState({ isShown: true });
          }}
        >
          PREVIEW
        </Button>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          widgets={customWidgets}
          onChange={getResult}
        >
          <Button
            marginTop={20}
            marginBottom={20}
            height={100}
            width="100%"
            fontSize="30px"
            display="block"
            onClick={() => {
              setState({ isShown: true });
            }}
          >
            PREVIEW
          </Button>
          <fieldset>
            <label className="control-label">Your Generated Meta Tags</label>
            <Textarea
              height={"300px"}
              placeholder="result"
              value={result}
              onChange={() => {}}
              onClick={onSelect}
            />
          </fieldset>
        </Form>
      </Pane>
      <Mdloader />
    </Fragment>
  );
}
