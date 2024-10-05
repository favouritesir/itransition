import React, { useRef } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-bs5'; 
import Thead from './Thead';
import './Table.css'

DataTable.use(DT);

export default function Table({state,setState}) {

  const [headers,...rows]=state.users;
  const table =useRef();

  const handleSearch=(e)=>{
    table.current.dt().search(e.target.value).draw();
  }
//   table.current.dt().on('click',e=>console.log(e.target.parentNode))
    
  return (
    <div className='table'>
        <input type="text" id="myS" onKeyUp={handleSearch} />
        <DataTable 
            className=' display  table table-striped table-bordered table-hover'
            data={
                rows.map(row=>['',...row])
            } 
            ref={table}            
              options={{  
                  columnDefs: [
                      {
                          orderable: false,
                          render: DT.render.select(), 
                          targets: 0
                      }
                  ],
                  select:{
                      style: 'multi+shift',    
                  },
                  order: [[1, 'asc']],
                  paging:false,
                  layout: {
                      topEnd:null
                  },
                  scrollY:'60vh',
                  scrollCollapse:true,
                  
              }}
        >
            
            <Thead headers={headers}/>  
        </DataTable>
    </div>
  )
}
