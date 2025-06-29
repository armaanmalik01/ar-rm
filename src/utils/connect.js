import { AdbDaemonWebUsbDevice } from "@yume-chan/adb-daemon-webusb";

async function connect(device) {
  try {
    return await device.connect();
  } catch (error) {
    if (error instanceof AdbDaemonWebUsbDevice.DeviceBusyError) {
      alert(
        "The device is already in use by another program. Please close the program and try again.",
      );
    }
    // It might also throw other errors
    throw error;
  }
}

export {
    connect
}