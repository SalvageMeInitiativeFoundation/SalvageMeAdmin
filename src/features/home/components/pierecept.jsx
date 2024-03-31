import React from 'react'
import { ResponsivePie } from '@nivo/pie';

function Pierecept({data}) {
    const graphData = [
        {
          id: "Pending",
          label: "Pending",
          value: data.filter((d)=>d.status=='pending').length,
          color: "hsl(90, 70%, 50%)"
        },
        {
          id: "Processing",
          label: "Processing",
          value: data.filter((d)=>d.status=='processing').length,
          color: "hsl(56, 70%, 50%)"
        },
        {
          id: "Accepted",
          label: "Accepted",
          value: data.filter((d)=>d.status=='recieved').length,
          color: "hsl(103, 70%, 50%)"
        },
        {
          id: "Donated",
          label: "Donated",
          value: data.filter((d)=>d.status=='donated').length,
          color: "hsl(186, 70%, 50%)"
        },
        {
          id: "Rejected",
          label: "Rejected",
          value: data.filter((d)=>d.status=='rejected').length,
          color: "hsl(104, 70%, 50%)"
        },
      ];
      



    return (
      <div style={{width:"400px",height:"45vh",padding:"5px"}}>
      <h5 className="cardItemTitle">Acceptance Analytics</h5>

      <ResponsivePie
        enableArcLinkLabels={false}
        data={graphData}
        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
      </div>
    );
}

export default Pierecept