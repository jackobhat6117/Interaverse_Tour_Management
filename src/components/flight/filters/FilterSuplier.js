import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";
import { getSupplierName } from "../../../data/flight/supplier/getSupplierName";

export default function FilterSuplier({ returnData, clear, orgi }) {
  const [suplier, setSuplier] = useState([
    // {
    //   name: "Intra1T",
    //   id: "Intra1T",
    //   value: true,
    // },
    // {
    //   name: "Intra1A",
    //   id: "Intra1A",
    //   value: true,
    // },
    // {
    //   name: "Intra1S",
    //   id: "Intra1S",
    //   value: true,
    // },
  ]);

  useEffect(() => {
    setSuplier(suplier => suplier?.map(obj => ({...obj,value:false})))
  },[clear])

  useEffect(() => {
    let suppliers = [...new Set(orgi?.map(obj => obj?.supplier))]?.map(supplier => ({name: supplier?.replace('_',' '),id: supplier,value: false}))
    setSuplier(suppliers)
  },[orgi])
  

  function handleCheck(val, i) {
    let temp = [...suplier];
    temp[i].value = val;
    setSuplier(temp);

    returnData(suplier);
  }
  return (
    <Collapse show label={<h5>Suplier</h5>}>
      {suplier.map((obj, i) => (
        <label key={i} className="flex gap-4 justify-between">
          <span className="flex gap-2">
            <input
              name="intra1ASuplier"
              checked={obj.value}
              onChange={(ev) => handleCheck(ev.target.checked, i)}
              type="checkbox"
            />
            <span>{getSupplierName(obj.name)}</span>
          </span>
        </label>
      ))}
    </Collapse>
  );
}
