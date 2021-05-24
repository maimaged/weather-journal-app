/* Global Variables */
// api key and url
const apiKey='&units=metric&appid=f31a7227eea7ebc86663fd03083a45b1';
const weatherUrlBase='https://api.openweathermap.org/data/2.5/weather?zip=';


//the generate button  waiting for click event
document.getElementById('generate').addEventListener('click',showWeatherResult);
//show weather result function which will lead to fetch to data

// get data request from api
const getData =async (UrlBase,zip,Key)=>{
 //fetch data from api 
 const request= await fetch(UrlBase+zip+Key);

 try{
 // convert data type from api 
 const response = await request.json();
 console.log(response);
 if(response.cod ==="400"||response.cod==="404"){
    alert("please enter a correct ZIP code")
    }
 return response;
     
    }
 catch(err){
    // show if there is an error in fetching 
    console.log("error", err);

          }    

};
// Create a new date instance dynamically with JS
let d = new Date();
// here i add 1 to the month value to modify the 0 t 11 range to give me correct indication for date
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();




// now we will post our fetched data and then pass it to the server side after that
const postDataToServer = async (url='',data={}) =>{
    console.log(data);
    const response= await fetch(url,
    {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
   });
    try{
        
        return ;

    }
    catch(err){
console.log(err);
    }
} 
// push button function apply after clicking
function showWeatherResult(e){
    const zipCode= document.getElementById('zip').value;
    if(zipCode== ''){
        alert("please enter zip code");
    }
    const userFeeling=document.getElementById('feelings').value;
    //call the function that fetch data from api
    getData(weatherUrlBase,zipCode,apiKey)
    .then((response)=>{
        
     // calling our post request function to send it to server after that
    postDataToServer('/weather',{'temp':response.main.temp,'date':newDate,'feeling':userFeeling})
    })
   .then((postDataToServer)=>{
    updateUI()
   })
}
const updateUI = async () => {
    const request = await fetch('/getData');
    try{
        //update UI with what i get from the server side 
      const allData = await request.json();
      document.getElementById('temp').innerHTML = `Temperature is ${allData.temp} celsuis`;
      document.getElementById('date').innerHTML = `Date is ${allData.date}`;
      document.getElementById('content').innerHTML = ` User feeling is ${allData.feeling}`;
     
    }catch(error){
      console.log("error", error);
    }
  }