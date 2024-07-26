import { TextField } from "../TextField";
import { ProdInfoFieldsData, ProdAddInfoFieldsData } from "../../../data";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { UseToggle } from "../../../hooks";
export const OrderInfo = () => {
  const [isOpenAddInfo, setOpenAddInfo] = UseToggle(true);

  const ProdInfoFieldElement = ProdInfoFieldsData?.map((data, index) => (
    <TextField
      key={index}
      name={data.name}
      type={data.type}
      label={data.label}
      options={data.option}
      placeholder={data.placeholder}
    />
  ));
  const ProdAddInfoFieldElement = ProdAddInfoFieldsData?.map((data, index) => (
    <TextField
      key={index}
      name={data.name}
      type={data.type}
      label={data.label}
      options={data.option}
      placeholder={data.placeholder}
      isImportant={data.name === 'color' ? false : true}
    />
  ));

  return (
    <div className="mt-5">
      <div className={` grid grid-cols-4 gap-5`}>{ProdInfoFieldElement}</div>
      <div className="mt-3">
        <div className="flex flex-row items-center gap-1 mb-3" >
          <div className="h-auto flex cursor-pointer select-none">
            <h2 className="text-2xl text-blue-500 font-semibold select-none" onClick={() => setOpenAddInfo(preval => !preval)}>
              Additional Information
            </h2>
            
            {isOpenAddInfo ? (
              <RiArrowDropUpLine
                className="text-blue-500 w-9 h-10 select-none"
                type="button"
                tabIndex={0}
              />
            ) : (
              <RiArrowDropDownLine 
                className="text-blue-500 w-9 h-10 select-none"
                type="button"
                tabIndex={0}
              />
            )}
          </div>
          
        </div>
        {isOpenAddInfo ? (
          <div className="flex flex-col gap-5 mb-5">
            {ProdAddInfoFieldElement}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
