import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";
import CopyText from "../../../../components/mini/CopyText";
import { toPascalCase } from "../../../../utils/toPascal";


export default function PassengerInfo({ label, traveler,order }) {
  console.log(traveler)
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-6 flex-wrap overflow-x-auto whitespace-nowrap max-w-full">
        <div className="sticky left-0">
          <Button1 className="flex gap-2">
            <Icon icon="ic:person" />1 {label}
          </Button1>
        </div>
        <div className="flex flex-col gap-6">
          <table className="w-[500px]" >
            <thead>
              <td className='pr-4'>First Name</td>
              <td className='pr-4'>Middle Name</td>
              <td className='pr-4'>Last Name</td>
              <td className='px-4'>Date of birth</td>
            </thead>
            <tbody>
              <td className='pr-4'>
                <Copier value={`${traveler?.firstName || traveler?.name?.firstName}`} className={'w-[100px]'} />
              </td>
              <td className='pr-4'>

                <Copier value={`${traveler?.middleName || traveler?.name?.middleName || ''}`} className={'w-[100px]'} />
              </td>
              <td className='pr-4'>
                <Copier value={`${traveler?.lastName || traveler?.name?.lastName}`} className={'w-[100px]'} />
              </td>
              <td className='px-4'>
                <Copier value={traveler?.birthDate} className={'w-[100px]'} />
              </td>
            </tbody>
          </table>


          <table className="w-[500px]" >
            <thead>
              <td className='pr-4'>Gender</td>
              <td className='px-4'>Email</td>
              <td className='px-4'>Phone</td>
              <td className='px-4'>{traveler?.document?.documentType} Id</td>
            </thead>
            <tbody>
              <td className='pr-4'>
                <Copier value={traveler?.gender ? toPascalCase(traveler?.gender) : ""} className={'w-[100px]'}  />
              </td>
              <td className='px-4'>
                <Copier value={`${traveler?.email}`}  />
              </td>
              <td className='px-4'>
                <Copier value={traveler?.phone} className={'w-[100px]'} />
              </td>
              <td className='px-4'><Copier value={traveler?.document?.number}  /></td>
            </tbody>
          </table>


          <table className="w-[500px]" >
            <thead>
              <td className='pr-4'>Birth Place</td>
              <td className='px-4'>Document expiry</td>
              <td className='px-4'>Issuance Date</td>
              <td className='px-4'>Issuance Country</td>
            </thead>
            <tbody>
              <td className='pr-4'>
                <Copier value={`${traveler?.document?.birthPlace}`} className={'w-[100px]'} />
              </td>
              <td className='px-4'>
                <Copier value={traveler?.document?.expiryDate} className={'w-[100px]'} />
              </td>
              <td className='px-4'><Copier value={traveler?.document?.issuanceDate} className={'w-[100px]'} /></td>
              <td className='px-4'>
                <Copier value={traveler?.document?.issuanceCountry} className={'w-[100px]'} />
              </td>
            </tbody>
          </table>


          <table className="w-[500px]" >
            <thead>
              <td className='pr-4'>Issuance Location</td>
              <td className='px-4'>Nationality</td>
              <td className='px-4'>Validity Country</td>
            </thead>
            <tbody>
              <td className='pr-4'>
                <Copier value={`${traveler?.document?.issuanceLocation}`} className={'w-[100px]'} />
              </td>
              <td className='px-4'>
                <Copier value={traveler?.document?.nationality} className={'w-[100px]'} />
              </td>
              <td className='px-4'>
                <Copier value={traveler?.document?.validityCountry}  />
              </td>
            </tbody>
          </table>

          <table className="w-[500px]" >
            <thead>
              <td className='pr-4'>Ticket No's</td>
            </thead>
            <tbody>
              <td className='pr-4 flex gap-4 flex-wrap'>
                {traveler?.ticketNumbers?.map((number,i) => (
                  <div key={i} className="flex gap-1">
                    <Copier value={`${number}`} className={'w-[100px]'} />
                  </div>
                ))}
              </td>
            </tbody>
          </table>
          
        </div>
      </div>
      {/* <div>
        <FlightInfo minify data={order}/>
      </div> */}
    </div>
  );
}

function Copier({value,className}) {
  return (
    <CopyText><input type='text' className={className} value={value} /></CopyText>
  )
}