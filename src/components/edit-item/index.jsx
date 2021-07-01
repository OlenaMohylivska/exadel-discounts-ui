import React from "react";
import { useParams } from "react-router-dom";
import AddItem from "components/add-item";

const EditItem = () => {
  const { id } = useParams();

  return <AddItem id={id} isEditable={true} />;
};

export default EditItem;
