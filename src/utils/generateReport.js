export function generateReport(data,columns,callback) {
    const csvData = data.map((row) => columns.map((col) => {
    //   let res = '';
      let value = row[col.field];

      // console.log(col)
    //   switch(col.field) {
    //     case 'bookingDate': 
    //       res = (new Date(value)).toDateString() + " " + (new Date(value)).toLocaleTimeString();
    //       break;
    //     case 'tripDetails':
    //       res = value.airline;
    //       res += " => "+value.path.origin +" - "+ value.path.destination
    //       break;
    //     case 'departureDate':
    //       res = `${value.date}`;
    //       res += value.time
    //       break;
    //     case 'PNR':
    //       res = value.id;
    //       break;
    //     default: return value;
    //   }
        if(callback)
            return callback(col.field,value)

      return value;
      
    }));

    console.log('csvData', csvData)

    
    // Prepend the column headers to the CSV data
    csvData.unshift(columns.map(col => col.headerName));

    const csvString = csvData.map(row => row.join(',')).join('\n');


    // Create a Blob object from the CSV data
    const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8'});

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Flight_Booking.csv';

    // Click the download link to initiate the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
