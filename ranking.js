
// dbデータ取得
export const fetchRanking = () => {
    return fetch('http://localhost:3000/records')
        .then(response => response.json())
        .catch(error => console.error('エラー:', error));
}

// すでにデータが挿入されているか確認
export const confirmDatabaseUser = (name, record, uid) => {
    fetchRanking().then((data) => {
        const extractedData = data.map((item) => {
            return {
                name: item.name,
                record: item.record,
                uid: item.uid,
            }
        })

        // データベースにuidが存在するか確認
        let exists = false;

        // dbのuidを見ていく
        extractedData.forEach((item) => {
            if (item.uid === uid) {
                exists = true;
            }
        });

        if (exists) {
            patchRecordData(name, record, uid);
        } else {
            postnewRecordData(name, record, uid);
        }
    })
}

// POSTデータ
export const postnewRecordData = (name, record, uid) => {
    const newRanking = {
        name: name,
        record: record,
        uid: uid,
    }

    fetch('http://localhost:3000/record', {
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

// PATCHデータ
export const patchRecordData = (name, record, uid) => {
    const newRanking = {
        name: name,
        record: record,
    }

    fetch(`http://localhost:3000/record/${uid}`, {
        method: 'PATCH',
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