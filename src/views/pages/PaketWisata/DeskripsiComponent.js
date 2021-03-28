import React from "react";

const DeskripsiComponent = ({ data }) => {
  return (
    <>
      <table width="100%" className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Hari Ke</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.hari_ke}</td>
              <td>{item.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DeskripsiComponent;
