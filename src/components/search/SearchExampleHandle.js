import { Search } from "@mui/icons-material";

export function SearchExampleHandle({ open }) {
    return (
      <div
        className={`absolute w-full bg-secondary rounded-b-md my-2 shadow-md border z-10 ${
          open ? " flex flex-col " : " hidden "
        }`}
      >
        <span className="text-primary/70 p-2 bg-primary/10">Search examples</span>
        <div className="px-4 py-2 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="light-bg p-3 rounded-md flex items-center justify-center ">
              <Search />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <h6>ABCDEF</h6>
              <p className="text-primary/50">
                Search by booking reference or other identifier
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="light-bg p-3 rounded-md flex items-center justify-center ">
              <Search />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <h6>LOS</h6>
              <p className="text-primary/50">Search by airport or city codes</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="light-bg p-3 rounded-md flex items-center justify-center ">
              <Search />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <h6>Okafor Chiemena</h6>
              <p className="text-primary/50">Search by passenger name</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="light-bg p-3 rounded-md flex items-center justify-center ">
              <Search />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <h6>Okafor Chiemena, LOS, JFK</h6>
              <p className="text-primary/50">Combine multiple search terms</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  