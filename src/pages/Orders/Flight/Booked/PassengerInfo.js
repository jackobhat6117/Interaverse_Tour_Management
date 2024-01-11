import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";
import { toPascalCase } from "../../../../utils/toPascal";
import FlightInfo from "./FlightInfo";

export default function PassengerInfo({ label, traveler,order }) {
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-6 flex-wrap">
        <div>
          <Button1 className="flex gap-2">
            <Icon icon="ic:person" />1 {label}
          </Button1>
        </div>
        <table className="w-[500px]">
          <thead>
            <td>Name</td>
            <td>Date of birth</td>
            <td>Gender</td>
          </thead>
          <tbody>
            <td>
              {traveler?.name?.firstName} {traveler?.name?.lastName}
            </td>
            <td>{traveler?.dateOfBirth}</td>
            <td>{traveler?.gender ? toPascalCase(traveler?.gender) : ""}</td>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2 light-bg p-2 px-4">
        <b>Flight Information</b>
        <div className="flex gap-4 text-theme1">
          <div className="flex gap-1">
            <Icon icon='mdi:seat-passenger' />
            <p>Seat 30J</p>
          </div>
          <div className="flex gap-1">
            <Icon icon='mdi:bag-suitcase' />
            <p>1 checked bag</p>
          </div>
          <div className="flex gap-1">
            <Icon icon='game-icons:school-bag' />
            <p>1 carry on bag</p>
          </div>
        </div>
      </div>
      {/* <div>
        <FlightInfo minify data={order}/>
      </div> */}
    </div>
  );
}
