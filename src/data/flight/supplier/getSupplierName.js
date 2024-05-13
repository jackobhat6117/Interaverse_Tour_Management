export function getSupplierName(defName='') {
    let name = defName;
    switch(name) {
        case 'Intra1A':
            name = 'Amadeus-A1';
             break;
        case 'Intra2A':
            name = 'Amadeus-A2';
            break;
        case 'Intra3A':
            name = 'Amadeus-A3';
            break;
        case 'Intra1T':
            name = 'Travel Port';
            break;
        case 'Intra1S':
            name = 'Sabre';
            break;
        case 'Intra1FR':
            name = 'TravX';
            break;
        case 'Intra1K':
            name = 'TravX1';
            break;
        default: ;
    }
    return name
}