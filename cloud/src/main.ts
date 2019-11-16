import GameScore from "./classes/GameScore";

GameScore.configureClass();

async function createGameScore() {
  const score1 = new GameScore();
  score1.set("score", 100);
  await score1.save();
  const score2 = await new GameScore().save();
  console.log("score1:", score1.get("score"), "score2", score2.get("score"));
  return {
    score1: score1.get("score"),
    score2: score1.get("score"),
  };
}
Parse.Cloud.define("createGameScores", () => {
  return createGameScore();
});
