
// 取得
export const fetchRanking = () => {
    return fetch('http://localhost:3000/foods')
        .then(response => response.json())
        .catch(error => console.error('エラー:', error));
}

const food = {
    name: "ブドウ",
    calories: 50,
}

// POSTデータ
export const postFoodData = () => {
    fetch('http://localhost:3000/food', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(food),
    })
    .then(response => response.json())
    .then(data => {
        console.log('サーバからのレスポンス:', data);
    })
    .catch((error) => {
        console.error('エラー:', error);
    });
}