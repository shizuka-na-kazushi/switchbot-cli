
import SwitchBotHttp from "./switchbot-http";
import fs from "node:fs/promises";
import Path from "node:path";
import { XDGPaths } from "./xdgpath";
import { SwitchBotCert } from "./types";

const SWITCHBOT_CACHE_DEVICES = "devices.json";
const SWITCHBOT_CACHE_SEL_DEVICE = "selected-device.json";
const SWITCHBOT_CONFIG_CERT_FILENAME = "cert.json";

export default class SwitchBotSystem {

  cert: SwitchBotCert | null = null;

  /**
   * async init
   */
  async init() : Promise<boolean> {
    const xdg = new XDGPaths();
    await xdg.init();
    return this._restoreCert();
  }

  /***
   * 
   */
  async registerCert(token: string, secret: string) : Promise<boolean> {
    this.cert = {token, secret};
    return this._storeCert();
  }

  /**
   * 
   * @returns Promise<boolean>, true if cert is stored.
   */
  async isCertRegistered() : Promise<boolean> {
    const ret = await this._restoreCert();
    return ret;
  }

  private async _storeCert() : Promise<boolean> 
  {
    if (!this.cert) return false;

    const xdg = new XDGPaths();
    const filename = Path.join(xdg.getCachePath(), SWITCHBOT_CONFIG_CERT_FILENAME);
    try {
      await fs.writeFile(filename, JSON.stringify(this.cert));
    } catch(err) {
      console.error(err);
      return false;
    }
    return false;
  }

  private async _restoreCert() : Promise<boolean> {
    const xdg = new XDGPaths();
    const filename = Path.join(xdg.getCachePath(), SWITCHBOT_CONFIG_CERT_FILENAME);
    try {
      const text = await fs.readFile(filename, 'utf-8');
      this.cert = JSON.parse(text) as SwitchBotCert;
    } catch(err) {
      // console.error(err);
      return false;
    }
    return true;
  }

  getHttp() : SwitchBotHttp {
    if (!this.cert) {
      throw new Error("token, secret is not registered yet!");
    }
    return new SwitchBotHttp(this.cert);
  }

  async devices(forceUpdate: boolean = false) : Promise<any> {
    if (!this.cert) {
      throw new Error("token, secret is not registered yet!");
    }

    const sbHttp = new SwitchBotHttp(this.cert);

    if (forceUpdate) {
      const devs = await sbHttp.devices();
      await this._storeDevices(devs);
      return devs;
    } else {
      return await this._restoreDevices();
    }
  }

  async selectedDeviceId() : Promise<string | null> {
    const obj = await this._restoreJson(SWITCHBOT_CACHE_SEL_DEVICE);
    if (!obj) return null;
    return obj.deviceId;
  }

  async selectTheDevice(deviceId: string) : Promise<void> {
    const obj = {deviceId};
    await this._storeJson(SWITCHBOT_CACHE_SEL_DEVICE, obj);
  }

  async unselectDevice() : Promise<void> {
    this._removeJson(SWITCHBOT_CACHE_SEL_DEVICE);
  }

  async retrieveDevice(deviceId: string) : Promise<any> {
    const devices = await this._restoreDevices();
    if (!devices) {
      throw Error("no device found. try 'device list' command first");
      return;
    }
    if (!devices.body || (devices && !devices.body)) {
      throw Error("no body available in JSON");
      return;
    }
    let device = devices.body.deviceList.find((item: any) => item.deviceId === deviceId);
    if (!device) {
        device = devices.body.infraredRemoteList.find((item: any) => item.deviceId === deviceId);
    }
    return device;
  }

  private async _storeDevices(devices: any) : Promise<boolean> {
    return this._storeJson(SWITCHBOT_CACHE_DEVICES, devices);
  }

  private async _restoreDevices() : Promise<any> {
    return this._restoreJson(SWITCHBOT_CACHE_DEVICES);
  }

  private async _storeJson(cacheName: string, jsonObj: any) : Promise<boolean> {
    const xdg = new XDGPaths();
    const filename = Path.join(xdg.getCachePath(), cacheName);
    try {
      await fs.writeFile(filename, JSON.stringify(jsonObj));
    } catch(err) {
      console.error(err);
      return false;
    }
    return false;
  }

  private async _restoreJson(cacheName: string) : Promise<any> {
    const xdg = new XDGPaths();
    const filename = Path.join(xdg.getCachePath(), cacheName);
    try {
      const text = await fs.readFile(filename, 'utf-8');
      return (JSON.parse(text));
    } catch(err) {
      return null;
    }
  }

  private async _removeJson(cacheName: string) : Promise<void> {
    const xdg = new XDGPaths();
    const filename = Path.join(xdg.getCachePath(), cacheName);
    try {
      await fs.rm(filename);
      return;
    } catch(err) {
      console.error(err);
      return;
    }
  }
}