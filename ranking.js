
export const fetchRanking = () => {
    return fetch('http://localhost:3000/ranking')
        .then(response => response.json())
        .catch(error => console.error('エラー:', error));
}

// const rankingData = {
//     name: 'プレイヤー名',
//     score: 1000
// };
  
//   fetch('http://localhost:3000/ranking', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(rankingData),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('サーバからのレスポンス:', data);
//   })
//   .catch((error) => {
//     console.error('エラー:', error);
//   });