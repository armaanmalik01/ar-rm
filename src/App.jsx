import './App.css'
import Popup from './components/Popup'
import Qr from "./components/Qr";

import { Button, Icon, Flex, Text, Box } from "@chakra-ui/react";
import { BsLightningCharge } from "react-icons/bs";
import { GrConnect, GrAndroid, GrClipboard } from "react-icons/gr";
import { GiShieldDisabled, } from "react-icons/gi";

import { FiTerminal } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";

import { useState, useEffect } from "react"


import { AdbDaemonWebUsbDeviceManager,  } from "@yume-chan/adb-daemon-webusb";
import { Adb, AdbDaemonTransport } from "@yume-chan/adb"
import AdbWebCredentialStore from '@yume-chan/adb-credential-web';


function App() {
  const [adbDeviceManager, set_adbDeviceManager] = useState(AdbDaemonWebUsbDeviceManager.BROWSER);

  

  const [store, set_store] = useState(new AdbWebCredentialStore());

  const [adb, set_adb] = useState();
  const [logs, set_logs] = useState([]);

  const [connected, set_connected] = useState(false);
  const [disabled, set_disabled] = useState(false);
  const [qr_open, set_qr_open] = useState(false);

  const connect = async () => {
    try { 
      const device = await adbDeviceManager.requestDevice();
      if (!device) return alert("No Device Selected By User");

      console.log(device.serial);
      
      const conn = await device.connect();
      
      set_adb(new Adb(
        await AdbDaemonTransport.authenticate(
          {
            serial: device.serial,
            connection: conn,
            credentialStore: store
          }
        )
      ));
      set_connected(true)
    } catch (error) {
      console.log(error)
    }
  }

  const runShell = async (cmd) => {
    if (!connected) return alert("Please Connect Device First");
    set_disabled(true)
    try {
      const output = await adb.subprocess.shellProtocol.spawnWaitText(cmd);
      set_logs([...logs, output])
      console.log(logs)
    } catch (error) {
      console.log(error);
    }finally{
      set_disabled(false)
    }
  }


  return (
    <>
      <Qr qr_open={qr_open} set_qr_open={set_qr_open} />
      <Popup />
      <Flex zIndex={"1"} bg={"#fff"} borderBottom={'2px solid #000'} position={'fixed'} top={'0'} left={'0'} width={'100%'} height={'60px'} align={'center'} justifyContent={'center'} px={'20px'} gapX={'10px'}>
        <Icon size={'lg'} cursor={'pointer'}>
          <BsLightningCharge />
        </Icon>
        <Text textStyle={'lg'} fontWeight={'bold'}>AR-RM</Text>
      </Flex>
      <Flex width={'100%'} height={'70px'}></Flex>
      <Flex p='20px' gap={'10px'} flexDirection={'column'}>
        <Box display={'flex'} flexDirection={'column'} gap={'7px'}>
          <Button onClick={() => connect()}> <GrConnect />Connect Phone</Button>
          <Button disabled={disabled}
            onClick={() => {
              runShell('pm disable-user --user 0 com.sec.knox.kccagent')
              // runShell("ohskj /sdcard")
            }}
          > <GrAndroid /> Disable Client</Button>
          <Button disabled={disabled} onClick={() => set_qr_open(true)}> <FaQrcode /> Show QR</Button>
          <Button disabled={disabled}
            onClick={() => {
              runShell('pm disable-user --user 0 com.sec.enterprise.knox.cloudmdm.smdms')
              setTimeout(() => {
                runShell('pm uninstall -k --user 0 com.sec.enterprise.knox.cloudmdm.smdms')
              }, 3000);
            }}
          > < GiShieldDisabled />Disable Knox</Button>
        </Box>
        <Flex justifyContent={'space-between'} my={'10px'} py='10px' borderBottom={'1px solid #000'}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Text textStyle={'md'}>
              Logs
            </Text>
            <Icon size="md">
              <GrClipboard />
            </Icon>
          </Box>
          <Box>
            <Text textStyle={'sm'}>
              Status : <span style={{ color: connected ? 'green' : 'red' }}>{
                connected ? "Connected" : "Disconnected"
              }</span>
            </Text>
          </Box>
        </Flex>
        <Box width={'100%'} bg="blackAlpha.800" p='5px' fontSize={'10px'} height={'200px'} overflowY={'scroll'}>
          {
            logs.map(e => <Text color={e.exitCode == 0 ? '#fff' : 'red.300'}>
              {e.stdout}
              {e.stderr}
            </Text>)
          }
        </Box>
        <Button disabled variant={'outline'}>
          <FiTerminal /> Custom Command
        </Button>
      </Flex>
    </>
  )
}

export default App
