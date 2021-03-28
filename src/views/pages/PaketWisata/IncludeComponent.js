import React from "react";

const IncludeComponent = ({ data }) => {
  return (
    <>
      <table width="100%" className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Include</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IncludeComponent;
