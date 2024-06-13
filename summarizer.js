$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        e.preventDefault();     //デフォルトのイベントを防ぐ
        const query = $('#query').val();    //検索クエリを取得
        fetchNews(query);       //ニュースを取得
    });
});

function fetchNews(query) {
    const apiKey = 'APIキーを入力';
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7); //過去1週間のニュースを取得

    const todayStr = today.toISOString().split('T')[0];
    const lastWeekStr = lastWeek.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=${query}&from=${lastWeekStr}&to=${todayStr}&apiKey=${apiKey}&pageSize=10`;

    $.get(url, function (data) {
        displayResults(data.articles);      //ニュースを表示
    });
}

function displayResults(articles) {
    const $results = $('#results');
    $results.empty();       //結果をクリア(ユーザビリティー向上)

    articles.forEach(article => {
        const summary = summarizeText(article.content || article.description);
        const publishedAt = new Date(article.publishedAt).toLocaleString();     //日付を取得
        $results.append(`
            <div class="article">
                <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                <p>${publishedAt}</p>
                <p>${article.description}</p>
                <p class="summary">${summary}</p>
            </div>
        `);
    });
}


function summarizeText(text) {
    // 簡易的なサマリー作成（ここでより高度なアルゴリズムを実装可能）
    if (!text) return 'サマリーなし';　//テキストがない場合の返し
    const sentences = text.split('. ');　//文章を分割
    return sentences.length > 5 ? sentences.slice(0, 5).join('. ') + '.' : text; //サマリーの5文を取得
}