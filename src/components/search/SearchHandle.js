import { useEffect, useState } from "react";
import { alertType } from "../../data/constants";
import { CircularProgress } from "@mui/material";

export function SearchHandle({ open, value }) {
    let limit = 5;
    let data = [
      {
        time: "Today, 11:30am",
        status: "confirmed",
        PNR: "2VBE4W",
        extra: "LOS - IST | $123,123 | Okafar Chiemena",
      },
      {
        time: "Today, 11:30am",
        status: "confirmed",
        PNR: "2VBE4W",
        extra: "LOS - IST | $123,123 | Okafar Chiemena",
      },
      {
        time: "12 July 2023, 2:30pm",
        status: "cancelled",
        PNR: "2VBE4W",
        extra: "LOS - IST | $123,123 | Okafar Chiemena",
      },
      {
        time: "14 July 2023, 2:30pm",
        status: "pending",
        PNR: "2VBE4W",
        extra: "LOS - IST | $123,123 | Okafar Chiemena",
      },
      {
        time: "12 July 2023, 2:30pm",
        status: "past",
        PNR: "2VBE4W",
        extra: "LOS - IST | $123,123 | Okafar Chiemena",
      },
    ];

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        value && load();
    },[value])


    async function load() {
        setLoading(true);
        const res = await new Promise(resolve => setTimeout(() => resolve({return: 1,data: []}),2000));
        setLoading(false);
    }
  
    return (
      <div
        className={`absolute w-full min-w-[350px] max-w-full bg-secondary rounded-b-md my-2 shadow-md border z-10 ${
          data?.length && open ? " flex flex-col " : " hidden "
        }`}
      >
        {loading ? 
            <div className="flex items-center justify-center p-4">
                <CircularProgress className="!w-4 !h-4" />
            </div>
        : 
            <div className="flex flex-col">
                <span className=" p-2 px-4 bg-primary/10">
                    Search results:
                    <span className="text-primary/70 px-2">
                        Showing {Math.min(limit, data.length)} of {data.length} matches
                    </span>
                </span>
                <div className="p-4 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
                    {data.map((obj, i) => {
                        let alertClass = alertType[obj.status] || "error";
                        return (
                        <div key={i} className="flex flex-col bg-primary bg-opacity-5 p-4">
                            <div className="flex gap-2 flex-wrap items-center justify-between">
                            <small>{obj.time}</small>
                            <small className={`${alertClass}`}>{obj.status}</small>
                            </div>
                            <h4>{obj.PNR}</h4>
                            <div>{obj.extra}</div>
                        </div>
                        );
                    })}
                </div>
            </div>
        }
      </div>
    )
  }