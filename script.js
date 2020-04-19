boltApi.Devices.add(deviceData.device,deviceData.api)
const device =boltApi.Devices.read(deviceData.device,deviceData.api)
try{
    var x=device.Utility.isOnline()
    x.then((g)=> {
        mainFunc(g,device)
        setInterval(mainFunc(g,device), 120000)} )
    }
catch(error){
    document.querySelector('.animatedConnect').style.display='none'
    document.querySelector('.connectedSVG').style.display='none'
    document.querySelector('#failToConnect').style.display='block'

}

function mainFunc(isOnline,dev)
{
    document.querySelector('.animatedConnect').style.display='none'
    document.querySelector('.connectedSVG').style.display='none'
    document.querySelector('#failToConnect').style.display='none'
    if(!isOnline){
        document.querySelector('.deviceStatus').innerHTML='Device Offline'
    document.querySelector('#failToConnect').style.display='block'

    }
    else{
    document.querySelector('.connectedSVG').style.display='block'
        document.querySelector('.deviceStatus span').innerHTML='Device Online' 
     var temp= dev.Analog.read()
     temp.then(x=>document.querySelector('.temperatureData').innerHTML=Math.round(x * 100 / 1024) +'°C')
     var door= dev.Digital.read(0)
     door.then(x=> document.querySelector('.doorData').innerHTML= x.state==='HIGH'?'open':'close')
     dev.Digital.write({ pin: 1, state: "LOW" })
    }
}
function checkSwitch(pin){
    if(document.getElementById('switch'+pin).checked)
    {
        device.Digital.write({ pin: pin, state: "HIGH" }) 
    }
    else{
        device.Digital.write({ pin: pin, state: 'LOW' }) 
    }
}