import crypto = require("crypto");
import { SwitchBotCert } from "./types";

const __debug__ = false;

type SwitchBotHttpHeader = {
  "Authorization": string,
  "Content-Type": string,
  t: string,
  nonce: string,
  data: string,
  sign: string,
}

export default class SwitchBotHttp {
  baseUrl = 'https://api.switch-bot.com';
  cert: SwitchBotCert | null = null;

  /**
   * 
   * 
   */
  constructor(_cert: SwitchBotCert) {
    this.cert = _cert;
  }

  private handleError(res: Response, jsonObj: any) {
    if (res.status != 200) {
      if (jsonObj && jsonObj.message) {
        throw new Error(`SwitchBot cloud responses error: code(${res.status})\n  message: "${jsonObj.message}"`);
      } else {
        throw new Error(`SwitchBot cloud responses error: code(${res.status})`);
      }
    }

    if (jsonObj && jsonObj.statusCode && (jsonObj.statusCode != 100)) {
      if (jsonObj.message) {
        throw new Error(`SwitchBot cloud responses: statusCode(${jsonObj.statusCode})\n  message: "${jsonObj.message}"`);
      } else {
        throw new Error(`SwitchBot cloud responses: statusCode(${jsonObj.statusCode})`);
      }
    }
  }

  private _headers(token: string, secret: string) : SwitchBotHttpHeader 
  {
    const t = Date.now();
    const nonce = crypto.randomUUID();
    const data = token + t + nonce;
    const signTerm = crypto.createHmac('sha256', secret).update(Buffer.from(data, 'utf-8')).digest();
    const sign = signTerm.toString("base64");

    return {Authorization: token, t: t.toString(), nonce, data, sign, "Content-Type": "application/json"};
  }

  async devices() : Promise<any> {
    if (!this.cert) {
      return null;
    }

    const url = this.baseUrl + '/v1.1/devices'
    const headers = this._headers(this.cert.token, this.cert.secret);
    
    const res = await fetch(url, {method: "GET", headers}); 
    const json = await res.json();
    this.handleError(res, json);
    if (__debug__) {
      console.log('------ devices -----')
      console.log(JSON.stringify(json, null, ' '));  
    }
    return json;
  }

  async deviceCommand(deviceId: string, jsonBody: any) : Promise<any> {
    if (!this.cert) {
      return null;
    }

    const url = this.baseUrl + `/v1.1/devices/${deviceId}/commands`;
    const body = JSON.stringify(jsonBody);
    const h = this._headers(this.cert.token, this.cert.secret);

    if (__debug__) {
      console.log(`sending to deviceId: ${deviceId}`);
      console.log(body);
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {...h as any,
          "Content-Length": body.length,
        },
        body});
    const json = await res.json();
    this.handleError(res, json);
    if (__debug__) {
      console.log(`------ commands -----`)
      console.log(JSON.stringify(json, null, ' '));
      console.log(`## http status code: ${res.status}`);
    }
    return json;
  }

  async deviceStatus(deviceId: string) : Promise<any> {
    if (!this.cert) {
      return null;
    }

    const url = this.baseUrl + `/v1.1/devices/${deviceId}/status`;
    const headers = this._headers(this.cert.token, this.cert.secret);

    const res = await fetch(url, {method: "GET", headers});
    const json = await res.json();
    this.handleError(res, json);
    if (__debug__) {
      console.log('------ status -----')
      console.log(JSON.stringify(json, null, ' '));  
    }
    return json;
  }

  async scenes() : Promise<any> {
    if (!this.cert) {
      return null;
    }
    const url = this.baseUrl + '/v1.1/scenes';
    const headers = this._headers(this.cert.token, this.cert.secret);

    const res = await fetch(url, {method: "GET", headers});
    const json = await res.json();
    this.handleError(res, json);
    if (__debug__) {
      console.log('------ scenes -----')
      console.log(JSON.stringify(json, null, ' '));  
    }
    return json;
  }

  async executeScene(sceneId: string) : Promise<any> {
    if (!this.cert) {
      return null;
    }

    const url = this.baseUrl + `/v1.1/scenes/${sceneId}/execute`;
    const h = this._headers(this.cert.token, this.cert.secret);

    const body = JSON.stringify({
        "sceneId": sceneId,
    })

    if (__debug__) {
      console.log(`sending to sceneId: ${sceneId}`);
      console.log(body);
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {...h as any,
            'Content-Length': body.length,
        },
        body});
    const json = await res.json();
    this.handleError(res, json);
    if (__debug__) {
      console.log(`------ execute scene -----`)
      console.log(JSON.stringify(json, null, ' '));  
    }
    return json;
  }
}
