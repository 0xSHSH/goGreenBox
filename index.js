import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const makeCommit = async (date) => {
  const data = {
    date: date,
  };

  await jsonfile.writeFile(path, data);

  await git
    .add([path])
    .commit(date, {
      "--date": date,
    });
};

const generateCommits = async () => {

  // ===== 2025 -> 67 commits =====
  for (let i = 0; i < 67; i++) {

    const randomMonth = Math.floor(Math.random() * 12);
    const randomDay = Math.floor(Math.random() * 28) + 1;

    const date = moment({
      year: 2025,
      month: randomMonth,
      day: randomDay,
    }).format();

    console.log("2025 Commit:", date);

    await makeCommit(date);
  }

  // ===== 2026 -> 36 commits =====
  for (let i = 0; i < 36; i++) {

    const randomMonth = Math.floor(Math.random() * 4);
    const randomDay = Math.floor(Math.random() * 28) + 1;

    const date = moment({
      year: 2026,
      month: randomMonth,
      day: randomDay,
    }).format();

    console.log("2026 Commit:", date);

    await makeCommit(date);
  }

  await git.push();

  console.log("DONE!");
};

generateCommits();