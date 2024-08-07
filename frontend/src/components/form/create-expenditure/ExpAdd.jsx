import { TextField } from "../TextField"
import { ExpData  } from "../../../data"

export const ExpAdd = () => {

  const ExpFieldElement = ExpData?.map((data , index) => (

    <TextField
     key={index}
     name={data.name}
     type={data.type}
     label={data.label}
     options={data.option}
     placeholder={data.placeholder}
    />
  ))

  return (
	<div className="mt-5">
    <div className={` grid grid-cols-3 gap-3`}>
      {ExpFieldElement}
    </div>
  </div>
  )
}

