import { useEffect, useState } from "react";
import Collapse from "../../mini/Collapse";

export default function FilterSuplier({ returnData, clear, orgi }) {
  const [suplier, setSuplier] = useState([
    // {
    //   name: "Travelport",
    //   id: "Travelport",
    //   value: true,
    // },
    // {
    //   name: "Amadeus",
    //   id: "Amadeus",
    //   value: true,
    // },
    // {
    //   name: "Sabre",
    //   id: "Sabre",
    //   value: true,
    // },
  ]);

  useEffect(() => {
    setSuplier(suplier => suplier?.map(obj => ({...obj,value:false})))
  },[clear])

  useEffect(() => {
    let suppliers = [...new Set(orgi?.map(obj => obj.supplier))]?.map(supplier => ({name: supplier?.replace('_',' '),id: supplier,value: false}))
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
              name="amadeuSuplier"
              checked={obj.value}
              onChange={(ev) => handleCheck(ev.target.checked, i)}
              type="checkbox"
            />
            <span>{obj.name}</span>
          </span>
        </label>
      ))}
    </Collapse>
  );
}
