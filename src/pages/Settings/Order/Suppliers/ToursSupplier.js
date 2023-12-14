import { MenuItem, TextField } from "@mui/material"
import Icon from "../../../../components/HOC/Icon"
import CustomTable from "../../../../components/Table/CustomTable"
import Button1 from "../../../../components/form/Button1"
import Modal1 from "../../../../components/DIsplay/Modal/Modal1"
import SupplierForm from "./SupplierForm"
import SupplierDeleteForm from "./SupplierDeleteForm"
import { createContext, useState } from "react"


const ActionContext = createContext();

function ActionCol({params}) {
    return (
    <ActionContext.Consumer>
        {(value) => {
            const {setEditObj,setDeleteObj} = value || {};
            return (
            <div className="flex gap-2">
                <label className='bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30'
                    onClick={() => setEditObj(params.row)}
                >
                    <Icon icon='tabler:edit' />
                </label>
                <label className='bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30'
                    onClick={() => setDeleteObj(params.row)}
                >
                    <Icon icon='material-symbols:delete' className='text-red-500' />
                </label>
            </div>
        )}}
    </ActionContext.Consumer>
    )
  }
  
  
const initObj = {
    name: '',
    xyzKey: '12341234',
    abcKey: '54315431',
}



export default function ToursSupplier() {
    const data = [
        {supplier: 'Amadeus',icon: '',
            option: [{...initObj,name:'Miles'},{...initObj,name:'My Own'}],...initObj,name:'Miles',
            using: 'Miles'},
        {supplier: 'TravelPort',icon: <Icon icon='tabler:edit' />,
            option: [{...initObj,name:'Miles'},{...initObj,name:'My Own'}],...initObj,name:'Miles',
            using: 'My own'},
    ]

    const [editObj,setEditObj] = useState();
    const [deleteObj,setDeleteObj] = useState();

    const columns = [
        {field: 'supplier',headerName: 'Supplier',
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <Icon icon='carbon:scis-transparent-supply' />
                    {/* <img src={params.row.img} alt='' /> */}
                    {params.value}
                </div>
            )
        },
        {field: 'using',headerName: 'Currently Using',
            renderCell: (params) => (
                <TextField select className={`w-full rounded-md ${params.value === 'My Own' ? 'bg-primary/10':'text-[#004C1F] bg-[#C4E9E3]'}`} size="small">
                    <MenuItem>Miles</MenuItem>
                    <MenuItem>My Own</MenuItem>
                </TextField>
            )
        },
        {field: 'actions',headerName: 'Actions',
            renderCell: (params) => {
                return (
                    <ActionContext.Provider value={{
                        setEditObj,
                        setDeleteObj
                    }}>
                        <ActionCol params={params} />
                    </ActionContext.Provider>
                )
            }
        }
    ]


    function handleUpdate(obj) {
        // update call
        // load() // table reload
    }


    return (
        <div className='flex flex-col gap-3 self-start'>
            <div className='flex justify-between gap-4'>
                <h5>Tours</h5>
                <div>
                    <Button1>+ Add</Button1>
                </div>
            </div>
            <CustomTable rows={data} columns={columns} />

            
            <Modal1 open={editObj} setOpen={() => setEditObj()}>
                <div className="card p-10">
                    <SupplierForm name='tour' update data={editObj} footer={(obj) => (
                        <div className="flex gap-4">
                            <label className="btn-theme-light" onClick={() => setEditObj()}>Cancel</label>
                            <Button1 onClick={() => handleUpdate(obj)}>Save Supplier</Button1>
                        </div>
                    )} />
                </div>
            </Modal1>
            <Modal1 open={deleteObj} setOpen={() => setDeleteObj()}>
                <div className="card p-10">
                    <SupplierDeleteForm update data={deleteObj} footer={(obj) => (
                        <div className="flex gap-4">
                            <Button1 className="!w-auto !btn-theme-light"  onClick={() => setDeleteObj()}>Cancel</Button1>
                            <Button1 className='!bg-red-500 !text-white' onClick={() => handleUpdate(obj)}>Delete</Button1>
                        </div>
                    )} />
                </div>
            </Modal1>

        </div>
    )
}