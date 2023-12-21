import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";

export default function ShareViaEmail() {
    return (
      <div className='py-10'>
        <Button1 variant='outlined' className='!border-primary !text-primary !font-bold flex gap-3 !py-5'>
          <Icon icon='ic:email' />
          Share Via Email
        </Button1>
      </div>
    )
  }
  