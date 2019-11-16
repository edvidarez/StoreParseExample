import ParseClass from "../core/ParseClass";

export default class GameScore extends ParseClass {
  public static configureClass() {
    super.configureClass(GameScore.className, new GameScore());
    Parse.Object.registerSubclass(this.className, this);
  }
  private static className = "GameScore";
  public requiredKeys = ["score"];
  public defaultValues = {score: 0};
  public minimumValues = {score: 0};
  public maximumValues = {score: 9999};

  constructor(params: { [key: string]: any } = {}) {
    super(GameScore.className, params);
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    this.setACL(acl);
  }
}
