var PageListening = (function () {
  var state = {
    phase: 'dictation',
    dayContent: null,
    showText: false,
    dictationInput: '',
    keywordsInput: '',
    dictationResult: null,
    keywordResult: null,
    comprehensionAnswers: [],
    comprehensionResult: null,
    sentenceIndex: 0,
    speakCtrl: null
  };

  function render() {
    var currentDay = AppStorage.getCurrentDay();
    state.dayContent = AppContent.days[currentDay - 1];
    if (!state.dayContent) return '<p class="error">内容加载失败</p>';
    var L = state.dayContent.listening;

    return '<div class="page-listening">' +
      '<h2 class="page-title">听力训练 — Day ' + currentDay + '</h2>' +
      '<div class="listening-topic-bar">' +
        '<strong>' + L.title + '</strong>' +
        '<span class="day-theme-badge">' + state.dayContent.themeZh + '</span>' +
      '</div>' +

      '<div class="tab-bar">' +
        tabBtn('dictation', '📝 听写练习', state.phase) +
        tabBtn('followRead', '🔁 跟读训练', state.phase) +
        tabBtn('comprehension', '🧠 听力理解', state.phase) +
      '</div>' +

      '<div id="listening-phase-content">' + renderPhase(L) + '</div>' +
    '</div>';
  }

  function tabBtn(id, label, active) {
    return '<button class="tab-btn' + (active === id ? ' active' : '') +
      '" data-tab="' + id + '" onclick="PageListening.switchPhase(\'' + id + '\')">' + label + '</button>';
  }

  function renderPhase(L) {
    if (state.phase === 'dictation') return renderDictation(L);
    if (state.phase === 'followRead') return renderFollowRead(L);
    if (state.phase === 'comprehension') return renderComprehension(L);
    return '';
  }

  function renderDictation(L) {
    var result = state.dictationResult;
    return '<div class="dictation-section">' +
      '<div class="instruction-box">' +
        '<strong>听写练习</strong>：先播放音频，在文本框中写出你听到的内容，然后点击"评分"查看结果。' +
      '</div>' +

      '<div class="tts-controls">' +
        '<div class="speed-control">' +
          '<label>语速：</label>' +
          '<select id="ttsRate" onchange="PageListening.setRate(this.value)">' +
            '<option value="0.75">慢速 0.75x</option>' +
            '<option value="1.0" selected>正常 1.0x</option>' +
            '<option value="1.25">快速 1.25x</option>' +
          '</select>' +
        '</div>' +
        '<div class="tts-btn-group">' +
          '<button class="btn btn-primary" onclick="PageListening.playAll()">▶ 播放全文</button>' +
          '<button class="btn btn-secondary" onclick="PageListening.stopTTS()">■ 停止</button>' +
          '<button class="btn btn-secondary" onclick="PageListening.toggleText()">' +
            (state.showText ? '隐藏原文' : '显示原文') +
          '</button>' +
        '</div>' +
      '</div>' +

      (state.showText ?
        '<div class="original-text">' + L.text.map(function(s, i) {
          return '<p class="sentence" id="sent-' + i + '">' + s + '</p>';
        }).join('') + '</div>' : '') +

      '<div class="dictation-input-area">' +
        '<label class="input-label">请在下方写出你听到的内容（英文）：</label>' +
        '<textarea id="dictationTextarea" class="dictation-textarea" rows="8" placeholder="在此输入你听到的英文内容...">' +
          (state.dictationInput || '') +
        '</textarea>' +
        '<div class="keyword-section">' +
          '<label class="input-label">关键词抓取（逗号分隔，写出你认为的关键词）：</label>' +
          '<input type="text" id="keywordsInput" class="keywords-input" placeholder="例如：brand equity, market share, consumer insight" value="' + (state.keywordsInput || '') + '">' +
        '</div>' +
        '<div class="action-row">' +
          '<button class="btn btn-primary btn-large" onclick="PageListening.scoreDictation()">📊 提交评分</button>' +
          '<button class="btn btn-secondary" onclick="PageListening.clearDictation()">清空</button>' +
        '</div>' +
      '</div>' +

      (result ? renderDictationResult(result, L) : '') +
    '</div>';
  }

  function renderDictationResult(result, L) {
    var dr = result.dictation, kr = result.keywords;
    var totalScore = Math.round(dr.accuracy * 0.6 + kr.score * 0.4);
    return '<div class="result-box">' +
      '<div class="result-title">📊 评分结果</div>' +
      '<div class="score-overview">' +
        '<div class="score-big" style="color:' + scoreColor(totalScore) + '">' + totalScore + '</div>' +
        '<div class="score-label">综合得分</div>' +
      '</div>' +
      '<div class="score-details">' +
        '<div class="score-item">' +
          '<span class="score-item-label">听写准确率</span>' +
          '<span class="score-item-val">' + dr.accuracy + '%</span>' +
          '<div class="mini-bar"><div class="mini-fill" style="width:' + dr.accuracy + '%;background:' + AppCharts.colors.listening + '"></div></div>' +
        '</div>' +
        '<div class="score-item">' +
          '<span class="score-item-label">关键词抓取</span>' +
          '<span class="score-item-val">' + kr.found + '/' + kr.total + '</span>' +
          '<div class="mini-bar"><div class="mini-fill" style="width:' + kr.score + '%;background:' + AppCharts.colors.quiz + '"></div></div>' +
        '</div>' +
      '</div>' +
      (dr.missed.length > 0 ?
        '<div class="missed-words">' +
          '<strong>未听出的词：</strong>' +
          dr.missed.slice(0, 15).map(function (w) {
            return '<span class="missed-tag">' + w + '</span>';
          }).join('') +
        '</div>' : '') +
      (kr.missedWords.length > 0 ?
        '<div class="missed-words">' +
          '<strong>遗漏关键词：</strong>' +
          kr.missedWords.map(function (w) {
            return '<span class="missed-tag kw">' + w + '</span>';
          }).join('') +
        '</div>' : '') +
      '<div class="original-text collapsed">' +
        '<div class="collapsed-title">查看原文 ▼</div>' +
        '<div class="original-content">' +
          L.text.map(function (s) { return '<p>' + s + '</p>'; }).join('') +
        '</div>' +
      '</div>' +
      '<button class="btn btn-primary" onclick="PageListening.saveListeningScore(' + totalScore + ')">✓ 保存得分并完成</button>' +
    '</div>';
  }

  function renderFollowRead(L) {
    var idx = state.sentenceIndex;
    var sentences = L.text;
    return '<div class="follow-read-section">' +
      '<div class="instruction-box">' +
        '<strong>跟读训练</strong>：逐句播放，跟读后点击下一句。' +
      '</div>' +
      '<div class="sentence-nav">' +
        '<span class="sentence-counter">' + (idx + 1) + ' / ' + sentences.length + '</span>' +
      '</div>' +
      '<div class="current-sentence-box">' +
        '<p class="current-sentence" id="currentSentence">' + sentences[idx] + '</p>' +
      '</div>' +
      '<div class="follow-controls">' +
        '<button class="btn btn-secondary" onclick="PageListening.prevSentence()" ' + (idx === 0 ? 'disabled' : '') + '>← 上一句</button>' +
        '<button class="btn btn-primary" onclick="PageListening.playSentence()">▶ 播放此句</button>' +
        '<button class="btn btn-secondary" onclick="PageListening.nextSentence()" ' + (idx >= sentences.length - 1 ? 'disabled' : '') + '>下一句 →</button>' +
      '</div>' +
      '<div class="all-sentences">' +
        '<div class="all-title">全文对照：</div>' +
        sentences.map(function (s, i) {
          return '<p class="follow-sentence' + (i === idx ? ' active' : '') + '" onclick="PageListening.jumpSentence(' + i + ')">' +
            '<span class="sent-num">' + (i + 1) + '.</span> ' + s + '</p>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  function renderComprehension(L) {
    var qs = L.comprehension;
    var result = state.comprehensionResult;
    return '<div class="comprehension-section">' +
      '<div class="instruction-box">' +
        '<strong>听力理解</strong>：先播放音频，再回答以下问题。' +
      '</div>' +
      '<div class="tts-controls">' +
        '<button class="btn btn-primary" onclick="PageListening.playAll()">▶ 播放全文</button>' +
        '<button class="btn btn-secondary" onclick="PageListening.stopTTS()">■ 停止</button>' +
      '</div>' +
      '<div class="questions-list">' +
      qs.map(function (q, qi) {
        return '<div class="question-block">' +
          '<div class="question-text"><strong>Q' + (qi+1) + '：</strong>' + q.question + '</div>' +
          '<div class="options-list">' +
          q.options.map(function (opt, oi) {
            var isSelected = state.comprehensionAnswers[qi] === oi;
            var isCorrect = result && oi === q.answer;
            var isWrong = result && isSelected && oi !== q.answer;
            var cls = 'option' + (isSelected ? ' selected' : '') + (isCorrect && result ? ' correct' : '') + (isWrong ? ' wrong' : '');
            return '<div class="' + cls + '" onclick="PageListening.selectAnswer(' + qi + ',' + oi + ')">' +
              '<span class="opt-letter">' + ['A','B','C','D'][oi] + '</span>' +
              '<span class="opt-text">' + opt + '</span>' +
            '</div>';
          }).join('') +
          '</div>' +
          (result ?
            '<div class="answer-explanation">' +
              (state.comprehensionAnswers[qi] === q.answer ? '✅ 正确！' : '❌ 正确答案：' + q.options[q.answer]) +
            '</div>' : '') +
        '</div>';
      }).join('') +
      '</div>' +
      (!result ?
        '<button class="btn btn-primary btn-large" onclick="PageListening.scoreComprehension()">提交答案</button>' :
        '<div class="result-summary">得分：' + result.score + '分（' + result.correct + '/' + result.total + ' 题正确）</div>') +
    '</div>';
  }

  function switchPhase(phase) {
    state.phase = phase;
    var el = document.getElementById('listening-phase-content');
    if (el) el.innerHTML = renderPhase(state.dayContent.listening);
    document.querySelectorAll('.tab-btn[data-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === phase);
    });
  }

  function playAll() {
    AppTTS.stop();
    var L = state.dayContent.listening;
    var sentences = L.text;
    var rate = parseFloat(document.getElementById('ttsRate') ? document.getElementById('ttsRate').value : 1.0);
    AppTTS.setRate(rate);
    var idx = 0;
    function playNext() {
      if (idx >= sentences.length) return;
      var i = idx;
      document.querySelectorAll('.sentence').forEach(function (el) { el.classList.remove('speaking'); });
      var el = document.getElementById('sent-' + i);
      if (el) el.classList.add('speaking');
      AppTTS.speak(sentences[i], { rate: rate, onEnd: function () {
        idx++;
        setTimeout(playNext, 600);
      }});
    }
    playNext();
  }

  function playSentence() {
    var L = state.dayContent.listening;
    var rate = 1.0;
    AppTTS.stop();
    AppTTS.speak(L.text[state.sentenceIndex], { rate: rate });
  }

  function stopTTS() { AppTTS.stop(); }

  function setRate(val) { AppTTS.setRate(parseFloat(val)); }

  function toggleText() {
    state.showText = !state.showText;
    var el = document.getElementById('listening-phase-content');
    if (el) el.innerHTML = renderPhase(state.dayContent.listening);
  }

  function prevSentence() {
    if (state.sentenceIndex > 0) { state.sentenceIndex--; refreshPhase(); }
  }

  function nextSentence() {
    var L = state.dayContent.listening;
    if (state.sentenceIndex < L.text.length - 1) { state.sentenceIndex++; refreshPhase(); }
  }

  function jumpSentence(i) {
    state.sentenceIndex = i;
    refreshPhase();
  }

  function refreshPhase() {
    var el = document.getElementById('listening-phase-content');
    if (el) el.innerHTML = renderPhase(state.dayContent.listening);
  }

  function scoreDictation() {
    var textarea = document.getElementById('dictationTextarea');
    var kwInput = document.getElementById('keywordsInput');
    if (!textarea) return;
    state.dictationInput = textarea.value;
    state.keywordsInput = kwInput ? kwInput.value : '';

    var L = state.dayContent.listening;
    var fullText = L.text.join(' ');
    var dr = AppScoring.scoreDictation(fullText, state.dictationInput);
    var userKW = state.keywordsInput.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var kr = AppScoring.scoreKeywords(L.keywords, userKW);

    dr.missed.forEach(function (w) { if (w.length > 3) AppStorage.addWeakVocabulary(w); });
    kr.missedWords.forEach(function (w) { AppStorage.addWeakVocabulary(w); });

    state.dictationResult = { dictation: dr, keywords: kr };
    refreshPhase();
  }

  function clearDictation() {
    state.dictationInput = '';
    state.keywordsInput = '';
    state.dictationResult = null;
    refreshPhase();
  }

  function selectAnswer(qi, oi) {
    if (state.comprehensionResult) return;
    state.comprehensionAnswers[qi] = oi;
    refreshPhase();
  }

  function scoreComprehension() {
    var L = state.dayContent.listening;
    var result = AppScoring.scoreComprehension(L.comprehension, state.comprehensionAnswers);
    state.comprehensionResult = result;
    refreshPhase();
  }

  function saveListeningScore(score) {
    var currentDay = AppStorage.getCurrentDay();
    AppStorage.saveDayProgress(currentDay, 'listening', {
      score: score,
      completed: true,
      timeSpent: 0,
      dictationAccuracy: state.dictationResult ? state.dictationResult.dictation.accuracy : 0,
      keywordsFound: state.dictationResult ? state.dictationResult.keywords.found : 0
    });
    App.showToast('听力得分已保存：' + score + ' 分', 'success');
  }

  function scoreColor(score) {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  function onLeave() {
    AppTTS.stop();
    state.dictationResult = null;
    state.comprehensionResult = null;
    state.comprehensionAnswers = [];
    state.showText = false;
    state.sentenceIndex = 0;
  }

  return {
    render: render,
    switchPhase: switchPhase,
    playAll: playAll,
    playSentence: playSentence,
    stopTTS: stopTTS,
    setRate: setRate,
    toggleText: toggleText,
    prevSentence: prevSentence,
    nextSentence: nextSentence,
    jumpSentence: jumpSentence,
    scoreDictation: scoreDictation,
    clearDictation: clearDictation,
    selectAnswer: selectAnswer,
    scoreComprehension: scoreComprehension,
    saveListeningScore: saveListeningScore,
    onLeave: onLeave
  };
})();
