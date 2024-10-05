import React,{useState} from 'react'
import {useLocation} from 'react-router-dom'
import Table from '../../Components/TableComponent/Table'



export default function Home() {
  const {state} = useLocation(); // state obj contain users obj or array
    state.dt = () => '';           // set an empty function to get dataTable to use dt api
    state.selected = [];           // store selected rows

  const [tableState,setTableState] = useState(state);

  return (
    <>  
      {
        state.users!=null &&
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <div className="container vh-80 shadow p-3">
            <Table state={tableState} setState={setTableState}/>
          </div>
        </div>
      }
    </>
  )
}
