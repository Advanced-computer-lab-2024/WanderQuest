import React from 'react'
import { Chart as ChartJS } from 'chart.js'
import { Bar,Doughnut,Line } from 'react-chartjs-2'
function report() {



  return (<>  
  
  
    <div><Bar 
        data={{
            labels:["A","B","C","D"],
            datasets:[{
                label:"Revenue",
                data:[200,300,400,500,600]
            }]


        }}  
    
        /></div>
  </>
)
}

export default report;