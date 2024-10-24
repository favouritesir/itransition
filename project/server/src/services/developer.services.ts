import { Request } from "express";

const generateApi = (domain: string, validUntill: number) => {
  /**
   * api = utcmillis + doamin + validUntill(UTCmillis)
   *
   * api = create encode with a secret key(it store on the server .env file)
   *
   * return api
   *
   */
};

class DevSearvice {
  protected req: any;
  constructor(req?: Request) {
    this.req = req;
    Object.seal(this);
  }

  verifyApi(api: string, domain: string): boolean {
    return api === this.getApiKey(domain);
  }

  registerNewDomain(domain: string) {
    // TODO: business logic here
  }

  getApiKey(domain: string) {
    return "JSLKFJSAKFDJIK3J49385598JF98JD";
    // TODO: business logic here
  }
  changeApiKey(domain: string) {
    // TODO: business logic here
  }
  deleteApiKey(domain: string) {
    // TODO: business logic here
  }
  getApiInfo(domain: string) {
    // TODO: business logic here
  }
  getDev() {
    const dev = this.req.user;
    return {
      data() {
        return dev;
      },
      // other methods here
    };
  }
}

export default (req?: Request) => {
  return new DevSearvice(req);
};
