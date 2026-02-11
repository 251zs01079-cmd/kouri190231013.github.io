// 1. 設定
const apiKey = 'c4ee9a71df1fde4bdc1c1e3e7edcbaac';
const city = 'Tokyo'; 
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

// 2. HTMLの要素を取得
const app = document.getElementById('weather-app');
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const iconEl = document.getElementById('weather-icon');
const adviceEl = document.getElementById('fashion-advice');
const updateBtn = document.getElementById('update-btn');

// 3. 天気を取得して画面を書き換える関数
async function getWeather() {
    try {
        // ボタンを無効化（連打防止）
        updateBtn.disabled = true;
        updateBtn.textContent = "読み込み中...";

        const response = await fetch(url);
        if (!response.ok) throw new Error("データの取得に失敗しました");
        
        const data = await response.json();

        // A. 基本情報の表示
        const temp = Math.round(data.main.temp);
        cityNameEl.textContent = `${data.name}の天気`;
        tempEl.textContent = `${temp}℃`;

        // B. 天気アイコンの表示
        const iconCode = data.weather[0].icon;
        iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconEl.alt = data.weather[0].description;

        // C. 気温に応じたアドバイスとデザイン変更
        let advice = "";
        if (temp >= 25) {
            advice = "【半袖】日差しが強いので、熱中症に気をつけて。";
            app.style.borderTop = "10px solid #ff6b6b"; // 赤
        } else if (temp >= 15) {
            advice = "【長袖・シャツ】過ごしやすいですが、夕方は羽織るものがあると安心です。";
            app.style.borderTop = "10px solid #ffd93d"; // 黄
        } else if (temp >= 5) {
            advice = "【コート・セーター】寒いので、しっかり防寒してお出かけください。";
            app.style.borderTop = "10px solid #4facfe"; // 青
        } else {
            advice = "【厚手のダウン・マフラー】凍える寒さです！最大級の防寒を。";
            app.style.borderTop = "10px solid #a18cd1"; // 紫
        }
        adviceEl.textContent = advice;

    } catch (error) {
        adviceEl.textContent = "エラー：天気がうまく取得できませんでした。APIキーを確認してください。";
        console.error(error);
    } finally {
        // ボタンを元に戻す
        updateBtn.disabled = false;
        updateBtn.textContent = "情報を更新する";
    }
}

// 4. イベント設定
updateBtn.addEventListener('click', getWeather);

// ページを開いた時に自動で実行
getWeather();