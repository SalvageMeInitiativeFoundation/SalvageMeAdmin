import { ResponsivePie } from '@nivo/pie';

const Pie = ({data}) => {

    const graphData = [
        {
          id: "Language",
          label: "Language",
          value: data.filter((d)=>d.category.toLowerCase()=='language').length,
          color: "hsl(90, 70%, 50%)"
        },
        {
          id: "Religion",
          label: "Religion",
          value: data.filter((d)=>d.category.toLowerCase()=='religion').length,
          color: "hsl(56, 70%, 50%)"
        },
        {
          id: "Social Science",
          label: "Social Science",
          value: data.filter((d)=>d.category.toLowerCase()=='social science').length,
          color: "hsl(103, 70%, 50%)"
        },
        {
          id: "Ap. Science & Technology",
          label: "Ap. Science & Technology",
          value: data.filter((d)=>d.category.toLowerCase()=='ap. science & technology').length,
          color: "hsl(186, 70%, 50%)"
        },
        {
          id: "Art Recreation",
          label: "Art Recreation",
          value: data.filter((d)=>d.category.toLowerCase()=='art recreation').length,
          color: "hsl(104, 70%, 50%)"
        },
        {
          id: "Science & Math",
          label: "Science & Math",
          value: data.filter((d)=>d.category.toLowerCase()=='science & math').length,
          color: "hsl(109, 70%, 50%)"
        },
        
        {
          id: "Generalities",
          label: "Generalities",
          value: data.filter((d)=>d.category.toLowerCase()=='generalities').length,
          color: "hsl(79, 70%, 50%)"
        },
        {
          id: "Literature",
          label: "Literature",
          value: data.filter((d)=>d.category.toLowerCase()=='literature').length,
          color: "hsl(80, 70%, 50%)"
        },
        {
          id: "Geography & History",
          label: "Geography & History",
          value: data.filter((d)=>d.category.toLowerCase()=='geography & history').length,
          color: "hsl(60, 70%, 50%)"
        },
        {
          id: "Philosophy & Psychology",
          label: "Philosophy & Psychology",
          value: data.filter((d)=>d.category.toLowerCase()=='philosophy & psychology').length,
          color: "hsl(20, 70%, 50%)"
        }
       
      ];
      



    return (
      <div className='pieContainer' >
      <h5 className="cardItemTitle">Materials Analytics</h5>
      <ResponsivePie
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
        enableArcLinkLabels={false}
        // legends={[
        //     {
        //         anchor: 'top-left',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 0,
        //         itemWidth: 100,
        //         itemHeight: 20,
        //         itemsSpacing: 0,
        //         symbolSize: 20,
        //         itemDirection: 'left-to-right'
        //     },
           
        // ]}
      />
      </div>
    );
  };
  export default Pie;
