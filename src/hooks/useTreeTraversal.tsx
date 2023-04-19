import { field } from "../HomePage";

export const useTreeTraversal = () => {
  const insertNode = (tree: field, nodeId: number, child: field): field => {
    if (tree.id === nodeId) {
      tree.children.push(child);
      return tree;
    }

    let newTree = [];
    newTree = tree.children.map((node) => {
      return insertNode(node, nodeId, child);
    });

    return { ...tree, children: newTree };
  };

  const deleteNode = (tree: field, nodeId: number): field => {
    let newChildren = tree.children.filter((child) => child.id !== nodeId);
    if (newChildren.length === tree.children.length - 1) {
      tree.children = [...newChildren];
      return tree;
    }

    let newTree = [];
    newTree = tree.children.map((node) => {
      return deleteNode(node, nodeId);
    });

    return { ...tree, children: newTree };
  };

  // const updateNode = (
  //   tree: field,
  //   nodeId: number,
  //   updatedChild: any
  // ): field => {
  //   let newChildren = tree.children.filter((child) => child.id !== nodeId);
  //   if (newChildren.length !== tree.children.length) {
  //     tree.children = [...newChildren, updatedChild];
  //   }

  //   let child = [];
  //   child = tree.children.map((node) => {
  //     return updateNode(node, nodeId, updatedChild);
  //   });

  //   return { ...tree, children: child };
  // };

  const updateNode = (
    tree: field,
    nodeId: number,
    updatedChild: any
  ): field => {
    if (tree.id === nodeId) {
      return { ...tree, ...updatedChild };
    }

    const children = tree.children.map((child) =>
      updateNode(child, nodeId, updatedChild)
    );

    const index = tree.children.findIndex((child) => child.id === nodeId);

    if (index === -1) {
      return { ...tree, children };
    }

    const newChildren = [...tree.children];
    newChildren.splice(index, 1, updatedChild);

    return { ...tree, children: newChildren };
  };

  return { insertNode, deleteNode, updateNode };
};
