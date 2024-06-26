/**
 * 
 */// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
 function TextTypingAnime(animationTime = 100) {
    $('.TextTyping').each(function() {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var thisChild = "";
        if (scroll >= elemPos - windowHeight) {
            thisChild = $(this).children('span'); // spanタグを取得
            // spanタグの要素の1つ1つに処理を追加
            thisChild.each(function(i) {
                var time = animationTime;
                // 時差で表示するためにdelayを指定し、その時間後にdisplayとopacityをアニメーションで変更
                $(this).delay(time * i).queue(function(next) {
                    $(this).css('display', 'flex').css('opacity', 0).animate({'opacity': 1}, time, function() {
                        // 最後のspanが表示されたかどうかをチェック
                        if (i === thisChild.length - 1) {
                            // すべてのspan要素が表示された後に2秒後にキャレットを非表示にする
                            setTimeout(function() {
                                $('.TextTyping').addClass('hide-caret'); // キャレットを非表示にする
                            }, 2000); // 2秒後
                        }
                    });
                    next();
                });
            });
        } else {
            thisChild = $(this).children('span');
            thisChild.each(function() {
                $(this).stop(); // delay処理を止める
                $(this).css('display', 'none'); // spanタグを非表示にする
            });
        }
    });
}

// idea-boxの高さに応じて上下のパディングを設定する関数
function setVerticalPadding(ideaBox) {
	var contentHeight = ideaBox.scrollHeight;
	var boxHeight = ideaBox.clientHeight;
	var padding = Math.max((boxHeight - contentHeight) / 2, 100); // 最低パディングを10pxとする
	ideaBox.style.paddingTop = padding + 'px';
	ideaBox.style.paddingBottom = padding + 'px';
	// console.log("boxHeight", boxHeight);
}


// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function() {
	// spanタグを追加する
	var element = $(".TextTyping");
	// 3秒後に縦棒のアニメーションを止める
	element.each(function() {
		var text = $(this).html();
		var textbox = "";
		text.split('').forEach(function(t) {
			if (t !== " ") {
				textbox += '<span style="display: none;">' + t + '</span>';
			} else {
				textbox += t;
			}
		});
		$(this).html(textbox);
	});

	//		setTimeout(function() {
	//			$('.TextTyping').removeClass('TextTyping');
	//		}, 3000);

	TextTypingAnime();/* アニメーション用の関数を呼ぶ */
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
