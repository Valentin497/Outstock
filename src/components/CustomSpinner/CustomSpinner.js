import React from "react";
import { Spinner } from "reactstrap";

export default function CustomSpinner() {
  return (
    <div className="p-4 w-100 d-flex flex-row justify-content-center align-items-center">
      <Spinner color="primary" type="grow">
        Loading...
      </Spinner>
      <Spinner color="secondary" type="grow">
        Loading...
      </Spinner>
      <Spinner color="success" type="grow">
        Loading...
      </Spinner>
      <Spinner color="danger" type="grow">
        Loading...
      </Spinner>
      <Spinner color="warning" type="grow">
        Loading...
      </Spinner>
    </div>
  );
}
