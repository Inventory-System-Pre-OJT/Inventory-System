import { TextField } from "../TextField";
import { OrderInfoFieldsData } from "../../../data";
import { useState } from "react";

export const ProductInfo = () => {
  const [metrics, setMetrics] = useState("");

  const handleMetricsChange = (event) => {
    setMetrics(event.target.value);
  };

  const getOrderFieldElement = () => {
    const fields = [...OrderInfoFieldsData];
    if (metrics === "mg") {
      fields.push({
        name: "grams",
        type: "number",
        label: "Grams",
        placeholder: "100mg",
      });
    }
    return fields.map((data, index) => (
      <TextField
        key={index}
        name={data.name}
        type={data.type}
        label={data.label}
        options={data.option}
        placeholder={data.placeholder}
        onChange={data.name === "metrics" ? handleMetricsChange : undefined}
      />
    ));
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row gap-5">
        {getOrderFieldElement()}
      </div>
    </div>
  );
};