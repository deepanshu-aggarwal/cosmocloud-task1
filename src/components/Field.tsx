import React, { useEffect, useRef, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { field } from "../HomePage";
import "./field.css";
import { useTreeTraversal } from "../hooks/useTreeTraversal";

const Field = ({ field, fields, setFields }: Props) => {
  const [children, setChildren] = useState<field[]>([]);
  const { insertNode, deleteNode, updateNode } = useTreeTraversal();

  const input = useRef<undefined | HTMLInputElement>();
  const type = useRef<undefined | HTMLSelectElement>();
  const [required, setRequired] = useState<boolean>();

  const handleAddField = () => {
    const newChild = {
      id: new Date().getTime(),
      input: "addName",
      type: "String",
      required: false,
      children: [],
    };

    const newFields = fields.map((item) => {
      return insertNode(item, field.id, newChild);
    });

    setFields([...newFields]);
  };

  const handleDelete = () => {
    let newFields = [];

    // finding if the desired field exists in the root array
    newFields = fields.filter((node) => node.id !== field.id);

    // if length after filter is same -> that field doesn't exists in root array
    if (newFields.length === fields.length) {
      // hence finding inside the fields using recursive approach
      newFields = fields.map((item) => {
        return deleteNode(item, field.id);
      });
    }

    setFields([...newFields]);
  };

  const handleUpdate = () => {
    const updatedField = {
      id: field.id,
      type: type.current.value,
      input: input.current.value,
      required,
      children,
    };

    let newFields = [];
    newFields = fields.map((node) => {
      return updateNode(node, field.id, updatedField);
    });

    setFields([...newFields]);
  };

  useEffect(() => {
    setRequired(field.required);
    setChildren(field.children);
  }, [fields]);

  return (
    <>
      <div className="field">
        <input defaultValue={field.input} ref={input} onChange={handleUpdate} />
        <select defaultValue={field.type} ref={type} onChange={handleUpdate}>
          {items.map((item) => (
            <option key={item.key} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <Switch
          defaultChecked={field?.required}
          checked={required}
          onClick={(val) => setRequired(val)}
        />
        {field?.type === "Object" && <PlusOutlined onClick={handleAddField} />}
        <DeleteOutlined onClick={handleDelete} />
      </div>
      <div style={{ paddingTop: "5px", paddingLeft: "25px" }}>
        {field?.type === "Object" &&
          field?.children?.map((child) => (
            <Field
              key={child.id}
              field={child}
              fields={fields}
              setFields={setFields}
            />
          ))}
      </div>
    </>
  );
};

export default Field;

type Props = {
  field: field;
  fields: field[];
  setFields: Function;
};

type MenuItems = {
  key: number;
  label: string;
};

const items: MenuItems[] = [
  {
    key: 1,
    label: "Boolean",
  },
  {
    key: 2,
    label: "Integer",
  },
  {
    key: 3,
    label: "String",
  },
  {
    key: 4,
    label: "Object",
  },
  {
    key: 5,
    label: "Array",
  },
];
