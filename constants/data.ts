export const json = JSON.stringify(
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  null,
  2
);

export const html = `<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>`;

export const svg = `<svg style="flex:1;" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="10" y="10" height="100" width="100"
    style="stroke:#ff0000; fill: #0000ff"/>
</svg>`;

export const css = `.main-wrapper {
  flex-direction: row;
  display: flex;
  flex: 1;
}
#content {
  flex: 1;
}
ul {
  padding: 20px 0;
  flex: 1;
}
li {
  font-family:'Lato';
  color: whitesmoke;
  line-height: 44px;
}
`;

export const javascript = `const container = css({
  flex: 1,
  padding: 10,
  backgroundColor: 'orange',
  color: colors.white,

  '&:hover': {
    backgroundColor: 'tomato',
  },
});`;

export const yaml = `---
  foo: "bar"
  baz:
    - "qux"
    - "quxx"
  corge: null
  grault: 1
  garply: true
  waldo: "false"
  fred: "undefined"
  emptyarr: []
  emptyobj: {}
`;

export const xml = `<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
`;

export const markdown = `Heading
=======
## Sub-heading
Paragraphs are separated
by a blank line.
Two spaces at the end of a line
produces a line break.
Text attributes _italic_,
**bold**, \`monospace\`.
Horizontal rule:
---
Bullet list:
  * apples
  * oranges
  * pears
Numbered list:
  1. wash
  2. rinse
  3. repeat
A [link](http://example.com).
![Image](https://via.placeholder.com/150)
> Markdown uses email-style > characters for blockquoting.
`;

export const flow = `export type AlertType = 'success'

export type AlertProps = {
  type: AlertType,
  text: string,
  testId: string,
}

type AlertTypeIconMap = {
  +[AlertType]: IconType,
}

const Alert = ({ type, text, testId }: AlertProps) => {
  const alertTypeIconMap: AlertTypeIconMap = {
    success: 'tick',
  }
  const styles = getStyles({ type })

  return (
      <View style={styles.iconContainer}>
        <Icon type={alertTypeIconMap[type]} />
      </View>
  )
}

export default Alert`;

export const graphql = `type Query {
	user: User!
}
type User {
	id: ID!
	profile: Profile!
	email: String!
	username: String!
}
type Profile {
	name: String!
	age: Int!
}`;

export const graphql1 = `scalar Date

schema {
  query: Query
}

type Query {
  me: User!
  user(id: ID!): User
  allUsers: [User]
  search(term: String!): [SearchResult!]!
  myChats: [Chat!]!
}

enum Role {
  USER,
  ADMIN,
}

interface Node {
  id: ID!
}

union SearchResult = User | Chat | ChatMessage

type User implements Node {
  id: ID!
  username: String!
  email: String!
  role: Role!
}

type Chat implements Node {
  id: ID!
  users: [User!]!
  messages: [ChatMessage!]!
}

type ChatMessage implements Node {
  id: ID!
  content: String!
  time: Date!
  user: User!
}
`;

export const graphqlDocument = `query findUser($userId: ID!) {
  user(id: $userId) {
    ...UserFields
  }
}

fragment UserFields on User {
  id
  username
  role
}`;

export const graphqlMongodb = `type User @entity {
  id: ID! @id
  username: String! @column
  email: String! @column @map(
    path: "login.email"
  )
  profile: Profile! @column
  chats: [Chat!]! @link
}

type Profile @entity(embedded: true, 
  additionalFields: [
    { path: "dateOfBirth", type: "string" }
  ]) {
  name: String! @column
  age: Int
}

type Chat @entity {
  id: ID! @id
  users: [User!]! @link
  messages: [ChatMessage!]!
}

type ChatMessage @entity {
  id: ID! @id
  chat: Chat! @link
  content: String! @column
  author: User! @link
}`;

export const jsObject = `{
	title: {
		type: 'String',
		trim: true,
		index: true,
		required: true
	},
	year: {
		type: 'Number',
		max: 2012,
		validate: 'validateBookYear'
	},
	author: {
		type: 'ObjectId',
		ref: 'Author',
		index: true,
		required: true
	}
}`;

export const jsonSchema = `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    },
    "height": {
      "type": ["number", "null"]
    },
    "favoriteFoods": {
      "type": "array",
      "minItems": 0,
      "maxItems": 2,
      "items": {
        "type": "string"
      }
    },
    "likesDogs": {
      "type": "boolean"
    }
  },
  "required": ["firstName", "lastName"]
}`;

export const obfuscate = `
var _0x20ca = [\"\\x68\\x6F\\x73\\x74\", \"\\x6C\\x6F\\x63\\x61\\x74\\x69\\x6F\\x6E\", \"\\x74\\x6F\\x70\", \"\\x77\\x77\\x77\\x2e\\x67\\x69\\x74\\x68\\x75\\x62\\x2e\\x63\\x6f\\x6d\", \"\\x68\\x74\\x74\\x70\\x3A\\x2F\\x2F\\x77\\x77\\x77\\x2e\\x67\\x69\\x74\\x68\\x75\\x62\\x2e\\x63\\x6f\\x6d\\x2F\", \"\\x5C\\x75\", \"\\x72\\x65\\x70\\x6C\\x61\\x63\\x65\", \"\\x74\\x6F\\x4C\\x6F\\x63\\x61\\x6C\\x65\\x4C\\x6F\\x77\\x65\\x72\\x43\\x61\\x73\\x65\", \"\\x5C\", \"\\x3F\", \"\\x3C\", \"\\x3E\", \"\\x20\", \"\\x3D\", \"\\x5D\", \"\\x5B\", \"\\x22\", \"\\x27\", \"\\x2C\", \"\\x3A\", \"\\x7D\", \"\\x7B\", \"\\x25\\x75\", \"\\x6A\\x73\\x6F\\x6E\\x5F\\x69\\x6E\\x70\\x75\\x74\", \"\\x67\\x65\\x74\\x45\\x6C\\x65\\x6D\\x65\\x6E\\x74\\x42\\x79\\x49\\x64\", \"\\x76\\x61\\x6C\\x75\\x65\", \"\\x74\\x72\\x69\\x6D\"];\r\nif (window[_0x20ca[2]][_0x20ca[1]][_0x20ca[0]] != _0x20ca[3]) {\r\n    window[_0x20ca[2]][_0x20ca[1]] = _0x20ca[4]\r\n};\r\nvar GB2312UnicodeConverter = {\r\n    ToUnicode: function(_0x5ffcx2) {\r\n        var _0x5ffcx3 = escape(_0x5ffcx2)[_0x20ca[7]]()[_0x20ca[6]](\/%u\/gi, _0x20ca[5]);\r\n        return _0x5ffcx3[_0x20ca[6]](\/%7b\/gi, _0x20ca[21])[_0x20ca[6]](\/%7d\/gi, _0x20ca[20])[_0x20ca[6]](\/%3a\/gi, _0x20ca[19])[_0x20ca[6]](\/%2c\/gi, _0x20ca[18])[_0x20ca[6]](\/%27\/gi, _0x20ca[17])[_0x20ca[6]](\/%22\/gi, _0x20ca[16])[_0x20ca[6]](\/%5b\/gi, _0x20ca[15])[_0x20ca[6]](\/%5d\/gi, _0x20ca[14])[_0x20ca[6]](\/%3D\/gi, _0x20ca[13])[_0x20ca[6]](\/%20\/gi, _0x20ca[12])[_0x20ca[6]](\/%3E\/gi, _0x20ca[11])[_0x20ca[6]](\/%3C\/gi, _0x20ca[10])[_0x20ca[6]](\/%3F\/gi, _0x20ca[9])[_0x20ca[6]](\/%5c\/gi, _0x20ca[8])\r\n    },\r\n    ToGB2312: function(_0x5ffcx2) {\r\n        return unescape(_0x5ffcx2[_0x20ca[6]](\/\\\\u\/gi, _0x20ca[22]))\r\n    }\r\n};\r\n\r\nfunction u2h() {\r\n    var _0x5ffcx5 = document[_0x20ca[24]](_0x20ca[23]);\r\n    var _0x5ffcx6 = _0x5ffcx5[_0x20ca[25]];\r\n    _0x5ffcx6 = _0x5ffcx6[_0x20ca[26]]();\r\n    _0x5ffcx5[_0x20ca[25]] = GB2312UnicodeConverter.ToGB2312(_0x5ffcx6)\r\n}\r\nfunction h2u() {\r\n    var _0x5ffcx5 = document[_0x20ca[24]](_0x20ca[23]);\r\n    var _0x5ffcx6 = _0x5ffcx5[_0x20ca[25]];\r\n    _0x5ffcx6 = _0x5ffcx6[_0x20ca[26]]();\r\n    _0x5ffcx5[_0x20ca[25]] = GB2312UnicodeConverter.ToUnicode(_0x5ffcx6)\r\n}\r\nfunction cnChar2EnChar() {\r\n    var _0x5ffcx5 = document[_0x20ca[24]](_0x20ca[23]);\r\n    var _0x5ffcx2 = _0x5ffcx5[_0x20ca[25]];\r\n    _0x5ffcx2 = _0x5ffcx2[_0x20ca[6]](\/\\\u2019|\\\u2018\/g, _0x20ca[17])[_0x20ca[6]](\/\\\u201C|\\\u201D\/g, _0x20ca[16]);\r\n    _0x5ffcx2 = _0x5ffcx2[_0x20ca[6]](\/\\\u3010\/g, _0x20ca[15])[_0x20ca[6]](\/\\\u3011\/g, _0x20ca[14])[_0x20ca[6]](\/\\\uFF5B\/g, _0x20ca[21])[_0x20ca[6]](\/\\\uFF5D\/g, _0x20ca[20]);\r\n    _0x5ffcx2 = _0x5ffcx2[_0x20ca[6]](\/\uFF0C\/g, _0x20ca[18])[_0x20ca[6]](\/\uFF1A\/g, _0x20ca[19]);\r\n    _0x5ffcx5[_0x20ca[25]] = _0x5ffcx2\r\n}
`;

export const jsonLd = `{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Jane Doe",
  "jobTitle": "Professor",
  "telephone": "(425) 123-4567",
  "url": "http://www.janedoe.com"
}
`;

export const jsonLdContext = `{
  "@context": "https://schema.org/"
}`;
