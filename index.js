import express from "express";
import { updateWinnings } from "./winnings.js";

const app = express();

const port = process.env.PORT || 8080;
app.use(express.json({ extended: false }));
app.get("/api", async (req, res) => {
  //const winnings = await updateWinnings();
  const winnings = await updateWinnings();
  //console.log(winnings);
  // console.log(jsonData.length);

  const range = Array.from({ length: 45 }, (_, i) => i + 1);
  // for (let k = 0; k < 100000; k++) {
  //   range.sort(() => Math.random() - 0.5);

  const shuffle = (numbers, countdown) => {
    countdown--;
    // console.log(countdown);
    if (countdown <= 0) {
      return numbers;
    }
    numbers.sort(() => Math.random() - 0.5);
    return shuffle(numbers, countdown);
  };
  const shuffled = shuffle(range, range.length);
  //   let result = chosen.sort(compareNumber);
  //   result = result.sort(compareNumber);
  //   result = result.sort(compareNumber);
  //   console.log(result);

  //console.log(typeof range[0]);
  function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }
  const startIdx = getRandomInt(0, 45);
  //   console.log(startIdx);
  let chosen;
  if (startIdx < 40) {
    chosen = shuffled.slice(startIdx, startIdx + 6);
  } else {
    const chosen1 = shuffled.slice(startIdx, 45);
    const chosen2 = shuffled.slice(0, 6 - (45 - startIdx));
    chosen = chosen1.concat(chosen2);
  }

  //console.log(typeof chosen[0]);
  //console.log(chosen);
  const compareNumber = (a, b) => {
    return a - b;
  };
  const result = chosen.sort(compareNumber);
  //   console.log(typeof chosen[0]);
  //   console.log(chosen);

  for (let i = 0; i < winnings.length; i++) {
    if (JSON.stringify(result) === JSON.stringify(winnings[i])) {
      console.log("duplicated");
      break;
    }
  }
  // }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.json({ result });
});

app.get("/api/duplicate", async (req, res) => {
  const winnings = await updateWinnings();
  //console.log(winnings);
  // console.log(jsonData.length);
  for (let i = 0; i < winnings.length; i++) {
    for (let j = i + 1; j < winnings.length; j++) {
      if (JSON.stringify(winnings[i]) === JSON.stringify(winnings[j])) {
        console.log("same numbers found", winnings[i], i, j);
      }
    }
    //console.log(i);
  }
});

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});

// import url from 'url'

// if (import.meta.url === url.pathToFileURL(process.argv[1]).href)    {
//     app.listen(port, () => {
//         console.log(`app listening at ${port}`);
//     });
// }

// export {app};

// console.log(import.meta.url);
// console.log(url.pathToFileURL(process.argv[1]).href);
