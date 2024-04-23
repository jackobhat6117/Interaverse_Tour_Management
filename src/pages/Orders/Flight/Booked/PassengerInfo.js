import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";
import { toPascalCase } from "../../../../utils/toPascal";


export default function PassengerInfo({ label, traveler,order }) {
  
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-6 flex-wrap overflow-x-auto whitespace-nowrap max-w-full">
        <div className="sticky left-0">
          <Button1 className="flex gap-2">
            <Icon icon="ic:person" />1 {label}
          </Button1>
        </div>
        <table className="w-[500px]" >
          <thead>
            <td className='pr-4'>Name</td>
            <td className='px-4'>Date of birth</td>
            <td className='px-4'>Gender</td>
            <td className='px-4'>{traveler?.document?.documentType} Id</td>
          </thead>
          <tbody>
            <td className='pr-4'>
              {traveler?.firstName || traveler?.name?.firstName} {traveler?.lastName || traveler?.name?.lastName}
            </td>
            <td className='px-4'>{traveler?.birthDate}</td>
            <td className='px-4'>{traveler?.gender ? toPascalCase(traveler?.gender) : ""}</td>
            <td className='px-4'>{traveler?.document?.number}</td>
          </tbody>
        </table>
      </div>
      {/* <div>
        <FlightInfo minify data={order}/>
      </div> */}
    </div>
  );
}
