import React from "react";

const ExcludeComponent = ({ data }) => {
  return (
    <>
      <table width="100%" className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Exclude</th>
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

export default ExcludeComponent;
