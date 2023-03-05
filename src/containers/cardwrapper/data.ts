import { CardItems } from "./CardWrapper";

const handleDel = () => {
    console.log("Del")
}
export const myData: Array<CardItems> = [
    {_id: "23102731",title:"Investigate response", description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due: new Date(), category: "China",priority:'HIGH', handleDel: {handleDel}},
    {_id: "23102731",title:"Investigate response", description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due: new Date(), category: "China", priority:'HIGH', handleDel: {handleDel}},
    {_id: "23102731",title:"Investigate response", description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due: new Date(), category: "China", priority:'HIGH', handleDel: {handleDel}},
    {_id: "23102731",title:"Investigate response", description:"The current response time of the server isn’t confirmed to be good.", task:'Investigate the response-time and prepare the according report for improving the response.', due: new Date(), category: "China", priority:'HIGH', handleDel: {handleDel}}
]