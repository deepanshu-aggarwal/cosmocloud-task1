import React, { useEffect, useState } from "react";
import Field from "./components/Field";
import { PlusOutlined } from "@ant-design/icons";
import "./App.css";

type Props = {};

export type field = {
  id: number;
  input: string;
  type: string;
  required: boolean;
  children: field[];
};

const HomePage = (props: Props) => {
  const [fields, setFields] = useState<field[]>([
    {
      id: new Date().getTime(),
      input: "addName",
      type: "Object",
      required: false,
      children: [],
    },
    {
      id: new Date().getTime() + 1,
      input: "addName",
      type: "Boolean",
      required: false,
      children: [],
    },
  ]);

  const handleAdd = () => {
    setFields([
      ...fields,
      {
        id: new Date().getTime(),
        input: "addName",
        type: "String",
        required: false,
        children: [],
      },
    ]);
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <div>
      <div className="heading">
        <div>Field name and type</div>
        <PlusOutlined onClick={handleAdd} />
      </div>
      {fields?.map((field) => (
        <Field
          key={field.id}
          field={field}
          fields={fields}
          setFields={setFields}
        />
      ))}
    </div>
  );
};

export default HomePage;
