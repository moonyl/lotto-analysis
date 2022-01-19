import fetch from 'node-fetch';
import XLSX from 'xlsx';

let winnings = [];

const updateWinnings = async () => {
    if (winnings.length === 0)  {
        const response = await fetch('https://blog.kakaocdn.net/dn/kFoeM/btrqMkfjrG4/Hdh3Zk8MCyyhrAtQk4rMC0/%EB%A1%9C%EB%98%90.xlsx?attach=1&knm=tfile.xlsx');
        const arrBuffer = await response.arrayBuffer();
        const wb = XLSX.read(arrBuffer, {type:'buffer'});
        
        const sheetName = wb.SheetNames[0]; 
        console.log(sheetName);
        const firstSheet = wb.Sheets[sheetName];
        //console.log(firstSheet);
        const jsonData = XLSX.utils.sheet_to_json( firstSheet, { defval : "" } );
        winnings = jsonData.map(item => {return [item['번호1'], item['번호2'], item['번호3'], item['번호4'], item['번호5'], item['번호6']]});
        // winnings.push(winnings[0]);
        return winnings;
    }
    // console.log('already loaded');
    return winnings;
};

export {updateWinnings};