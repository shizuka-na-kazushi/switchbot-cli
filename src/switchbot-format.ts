

export function printFmtDevices(devices: any) : boolean {
  if (!devices && !devices.body) {
    return false;
  }

  if (devices.body.deviceList) {
    console.log("------- device list --------");
    console.log("deviceId deviceType \tdeviceName");

    let list = devices.body.deviceList;
    list.forEach((d: any) => {
      console.log(`${d.deviceId} "${d.deviceType}" \t"${d.deviceName}"`);
    })
  } 
  
  if (devices.body.infraredRemoteList){
    console.log("------- infrared remote list --------");
    console.log("deviceId deviceType hubDeviceId \tdeviceName");

    let list = devices.body.infraredRemoteList;
    list.forEach((d: any) => {
      console.log(`${d.deviceId} "${d.remoteType}" ${d.hubDeviceId} \t"${d.deviceName}"`);
    })
  }
  return true;
}

export function printFmtScenes(scenes: any) : boolean {
  if (!scenes && !scenes.body) {
    return false;
  }

  console.log("sceneId\tsceneName");
  scenes.body.forEach((s: any) => {
    console.log(`${s.sceneId}\t"${s.sceneName}"`);
  });

  return true;
}