import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";
import FlightInfo from "./FlightInfo";

export default function PassengerInfo({label}) {
    return (
      <div className='flex flex-col gap-2 py-4'>
        <div className='flex gap-6 flex-wrap'>
          <div>
            <Button1 className='flex gap-2'>
              <Icon icon='ic:person' />
              1 {label}
            </Button1>
          </div>
          <table className='w-[500px]'>
            <thead>
              <td>Name</td>
              <td>Date of birth</td>
              <td>Gender</td>
            </thead>
            <tbody>
              <td>Ike Chinedu</td>
              <td>17/10/1956</td>
              <td>Male</td>
            </tbody>
          </table>
        </div>
        <div>
          <FlightInfo minify />
        </div>
      </div>
    )
  }
  