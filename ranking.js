
// 取得
export const fetchRanking = () => {
    return fetch('http://localhost:3000/foods')
        .then(response => response.json())
        .catch(error => console.error('エラー:', error));
}

// POSTデータ
export const postnewRecordData = (name, record) => {
    const newRanking = {
        name: name,
        record: record,
    }

    fetch('http://localhost:3000/food', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(newRanking),
    })
    .then(response => response.json())
    .then(data => {
        console.log('サーバからのレスポンス:', data);
    })
    .catch((error) => {
        console.error('エラー:', error);
    });
}