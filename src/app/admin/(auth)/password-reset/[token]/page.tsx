import React from "react";
import Form from "./Form";

const page = ({ params }: { params: { token?: string } }) => {
  return <Form params={params} />;
};

export default page;
