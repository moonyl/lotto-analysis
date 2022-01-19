import express from 'express';
import { updateWinnings } from './winnings.js';

const app = express();

const port = process.env.HTTP_PORT || 80;
app.get('/api', async (req, res) => {
    //const winnings = await updateWinnings();
    const winnings = await updateWinnings();
    //console.log(winnings);
    // console.log(jsonData.length);    

    const range = Array.from({length: 46}, (_, i) => i+1);
    // for (let k = 0; k < 100000; k++) {
        range.sort(() => Math.random() - 0.5);

        //console.log(typeof range[0]);
        const chosen = range.slice(0, 6);
        //console.log(typeof chosen[0]);
        //console.log(chosen);
        const compareNumber = (a, b) => {
            return a-b;
        }
        const result = chosen.sort(compareNumber);
        // console.log(result);
        
        for (let i = 0; i < winnings.length; i++)   {
            if (JSON.stringify(result) === JSON.stringify(winnings[i])) {
                console.log('duplicated');
                break;
            }
        }
    // }
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json({result});
});

app.get('/api/duplicate', async (req, res) => {
    const winnings = await updateWinnings();
    //console.log(winnings);
    // console.log(jsonData.length);    
    for (let i = 0; i < winnings.length; i++)   {
        for (let j = i+1; j < winnings.length; j++) {
            if (JSON.stringify(winnings[i]) === JSON.stringify(winnings[j])) {
                console.log("same numbers found", winnings[i], i, j);
            }
        }
        //console.log(i);
    }
})

import url from 'url'

if (import.meta.url === url.pathToFileURL(process.argv[1]).href)    {
    app.listen(port, () => {
        console.log(`app listening at ${port}`);
    });
} 

export {app};






// console.log(import.meta.url);
// console.log(url.pathToFileURL(process.argv[1]).href);