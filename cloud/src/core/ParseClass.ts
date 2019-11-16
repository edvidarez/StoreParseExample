/**
 * My custom implementation of Parse Cloud Classes based in
 *  https://github.com/owsas/parse-cloud-class
 *  Developed by Juan Camilo Guarín Peñaranda,
 *  Otherwise SAS, Colombia
 *  2017
 *
 *  Edmundo Vidaña Alvarez
 *  ArgesLab, Mexico
 *  2019
 */

export default class ParseClass extends Parse.Object {
  public static checkRequiredKeys(obj: Parse.Object, requiredKeys: string[]): void {
    requiredKeys.forEach((requiredParam) => {
      const currentValue = obj.get(requiredParam);
      if (currentValue === undefined) {
        throw new Parse.Error(156, `MISSING REQUIRED FIELDS ${requiredKeys.join(", ")}`);
      }
    });
  }

  public static setDefaultValues(obj: Parse.Object, defaultValues: any): Parse.Object {
    for (const key of Object.keys(defaultValues)) {
      if (obj.get(key) === undefined) {
        obj.set(key, defaultValues[key]);
      }
    }
    return obj;
  }

  public static checkMinimumValues(obj: Parse.Object, minimumValues: { [key: string]: number } = {}): Parse.Object {
    for (const key in minimumValues) {
      if (obj.get(key) === undefined || (obj.get(key) < minimumValues[key])) {
        obj.set(key, minimumValues[key]);
      }
    }
    return obj;
  }

  public static checkMaximumValues(obj: Parse.Object, maximumValues: { [key: string]: number } = {}): Parse.Object {
    for (const key in maximumValues) {
      if ((obj.get(key) > maximumValues[key])) {
        obj.set(key, maximumValues[key]);
      }
    }
    return obj;
  }
  public static configureClass(className: string, instance: ParseClass): void {
    Parse.Cloud.beforeSave(className, async (req) => {
      await instance.beforeSave(req);
      req.object = await instance.processBeforeSave(req);
    });
    Parse.Cloud.afterSave(className, instance.afterSave);
  }
  public requiredKeys: string[] = [];
  public defaultValues: { [key: string]: any } = {};
  public minimumValues: { [key: string]: number } = {};
  public maximumValues: { [key: string]: number } = {};

  constructor(classname: string, params: { [key: string]: any } = {}) {
    super(classname);

    if (params !== undefined && Object.keys(params).length !== 0) {
      Object.keys(params).forEach((key) => {
        this.set(key, params[key]);
      });
      ParseClass.setDefaultValues(this, this.defaultValues);
    }
    this.afterSave = this.afterSave.bind(this);
    this.beforeSave = this.beforeSave.bind(this);

  }

  // tslint:disable-next-line: no-empty
  public async beforeSave(req: Parse.Cloud.BeforeSaveRequest): Promise<any> {
    console.log("before save for ", req.object.className, "is not defined");
  }

  // tslint:disable-next-line: no-empty
  public async afterSave(req: Parse.Cloud.BeforeDeleteRequest): Promise<any> {
    console.log("after save for ", req.object.className, "is not defined");
   }

  private async processBeforeSave(req: Parse.Cloud.BeforeSaveRequest): Promise<any> {
    const obj = req.object;
    ParseClass.setDefaultValues(obj, this.defaultValues);
    ParseClass.checkMinimumValues(obj, this.minimumValues || {});
    ParseClass.checkMaximumValues(obj, this.maximumValues || {});
    ParseClass.checkRequiredKeys(obj, this.requiredKeys);
    return obj;
  }
}
