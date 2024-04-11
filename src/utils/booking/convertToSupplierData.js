export default function convertToSupplierData(ourData,supplierData) {
    let data = {...(supplierData || {})}
    const supplier = ourData?.supplier;

    try {



        if(supplier === 'Intra1A') {
            if(ourData?.travelers) {
                data?.travelers?.map((traveler,i) => {
                    traveler.name.firstName = ourData?.travelers[i]?.firstName;
                    traveler.name.lastName = ourData?.travelers[i]?.lastName;
                    return true;
                })
            }
        }



    } catch(ex) {}
        
    return data;
}