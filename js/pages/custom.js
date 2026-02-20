var PageCustom = (function () {
  var state = {
    tab: 'cases',
    editingCase: null,
    editingMethod: null
  };

  function render() {
    return '<div class="page-custom">' +
      '<h2 class="page-title">我的素材库</h2>' +
      '<p class="page-desc">在这里添加你自己的营销案例素材和方法论要点，系统会在口语和写作训练中为你提供参考。</p>' +

      '<div class="tab-bar">' +
        tabBtn('cases', '📁 我的案例', state.tab) +
        tabBtn('methodologies', '📚 我的方法论', state.tab) +
      '</div>' +

      '<div id="custom-tab-content">' + renderTab() + '</div>' +
    '</div>';
  }

  function tabBtn(id, label, active) {
    return '<button class="tab-btn' + (active === id ? ' active' : '') +
      '" data-tab="' + id + '" onclick="PageCustom.switchTab(\'' + id + '\')">' + label + '</button>';
  }

  function renderTab() {
    return state.tab === 'cases' ? renderCases() : renderMethodologies();
  }

  function renderCases() {
    var data = AppStorage.getAll();
    var cases = (data.customContent && data.customContent.cases) || [];

    return '<div class="custom-section">' +
      '<div class="custom-header">' +
        '<div class="custom-hint">添加你的真实营销案例素材，结构化存储，方便练习时调用。</div>' +
        '<button class="btn btn-primary" onclick="PageCustom.newCase()">+ 新增案例</button>' +
      '</div>' +

      (state.editingCase !== null ? renderCaseForm(cases) : '') +

      (cases.length === 0 ?
        '<div class="empty-state">' +
          '<div class="empty-icon">📁</div>' +
          '<div class="empty-text">还没有案例素材</div>' +
          '<div class="empty-hint">点击"新增案例"添加你的第一个营销案例</div>' +
        '</div>' :
        '<div class="cards-grid">' +
          cases.map(function (c, i) { return renderCaseCard(c, i); }).join('') +
        '</div>') +

      '<div class="template-guide">' +
        '<div class="guide-title">💡 案例结构建议（STAR 法则）</div>' +
        '<ul class="guide-list">' +
          '<li><strong>Situation：</strong>市场背景、品牌挑战、时间节点</li>' +
          '<li><strong>Task：</strong>你的具体职责和目标</li>' +
          '<li><strong>Action：</strong>你采取的 3 个关键行动（越具体越好）</li>' +
          '<li><strong>Result：</strong>可量化的成果（% 增长、绝对值、时间节点）</li>' +
        '</ul>' +
      '</div>' +
    '</div>';
  }

  function renderCaseForm(cases) {
    var isNew = state.editingCase === 'new';
    var c = isNew ? { title: '', scenario: '', situation: '', task: '', action: '', result: '', keywords: '' }
      : cases[state.editingCase] || {};

    return '<div class="edit-form-overlay">' +
      '<div class="edit-form">' +
        '<div class="form-title">' + (isNew ? '新增案例' : '编辑案例') + '</div>' +
        formField('案例名称', 'caseTitle', c.title, '例如：脉动夏季营销活动案例 2023') +
        formField('一句话场景描述（英文）', 'caseScenario', c.scenario, 'A brand repositioning project targeting Gen Z consumers in Q2 2023.') +
        formTextarea('Situation（情况背景，英文）', 'caseSituation', c.situation, 'Describe the market context, brand challenge, and your role...') +
        formTextarea('Task（任务目标，英文）', 'caseTask', c.task, 'My goal was to...') +
        formTextarea('Action（关键行动，英文）', 'caseAction', c.action, '1. I led...\n2. We developed...\n3. I collaborated with...') +
        formTextarea('Result（成果数据，英文）', 'caseResult', c.result, 'As a result, brand awareness increased by X%, and market share grew from Y% to Z%.') +
        formField('关键词（英文，逗号分隔）', 'caseKeywords', isNew ? '' : (c.keywords || []).join(', '), 'brand repositioning, consumer insight, campaign ROI') +
        '<div class="form-actions">' +
          '<button class="btn btn-primary" onclick="PageCustom.saveCase(\'' + (isNew ? 'new' : state.editingCase) + '\')">保存</button>' +
          '<button class="btn btn-secondary" onclick="PageCustom.cancelEdit()">取消</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderCaseCard(c, i) {
    return '<div class="custom-card">' +
      '<div class="card-title">' + (c.title || '（未命名案例）') + '</div>' +
      (c.scenario ? '<div class="card-scenario">' + c.scenario + '</div>' : '') +
      (c.keywords && c.keywords.length > 0 ?
        '<div class="card-tags">' + c.keywords.map(function (k) {
          return '<span class="card-tag">' + k + '</span>';
        }).join('') + '</div>' : '') +
      '<div class="card-date">' + (c.createdAt ? c.createdAt.split('T')[0] : '') + '</div>' +
      '<div class="card-actions">' +
        '<button class="btn btn-secondary btn-sm" onclick="PageCustom.editCase(' + i + ')">编辑</button>' +
        '<button class="btn btn-danger btn-sm" onclick="PageCustom.deleteCase(' + i + ')">删除</button>' +
        '<button class="btn btn-secondary btn-sm" onclick="PageCustom.playCase(' + i + ')">▶ 朗读</button>' +
      '</div>' +
    '</div>';
  }

  function renderMethodologies() {
    var data = AppStorage.getAll();
    var methods = (data.customContent && data.customContent.methodologies) || [];

    return '<div class="custom-section">' +
      '<div class="custom-header">' +
        '<div class="custom-hint">整理你掌握的营销方法论框架，供口语汇报练习时参考。</div>' +
        '<button class="btn btn-primary" onclick="PageCustom.newMethod()">+ 新增方法论</button>' +
      '</div>' +

      (state.editingMethod !== null ? renderMethodForm(methods) : '') +

      (methods.length === 0 ?
        '<div class="empty-state">' +
          '<div class="empty-icon">📚</div>' +
          '<div class="empty-text">还没有方法论要点</div>' +
          '<div class="empty-hint">点击"新增方法论"添加你掌握的营销框架</div>' +
        '</div>' :
        '<div class="cards-grid">' +
          methods.map(function (m, i) { return renderMethodCard(m, i); }).join('') +
        '</div>') +

      '<div class="template-guide">' +
        '<div class="guide-title">💡 常用营销方法论参考</div>' +
        '<ul class="guide-list">' +
          '<li>4P Framework (Product, Price, Place, Promotion)</li>' +
          '<li>Brand Positioning Statement Template</li>' +
          '<li>Consumer Journey Mapping</li>' +
          '<li>STAR Storytelling Method</li>' +
          '<li>SCR Presentation Framework (Situation, Complication, Resolution)</li>' +
          '<li>Long and Short of It — Brand vs. Activation Investment</li>' +
        '</ul>' +
      '</div>' +
    '</div>';
  }

  function renderMethodForm(methods) {
    var isNew = state.editingMethod === 'new';
    var m = isNew ? { title: '', summary: '', points: '' }
      : methods[state.editingMethod] || {};

    return '<div class="edit-form-overlay">' +
      '<div class="edit-form">' +
        '<div class="form-title">' + (isNew ? '新增方法论' : '编辑方法论') + '</div>' +
        formField('方法论名称', 'methodTitle', m.title, '例如：4P Marketing Mix Framework') +
        formField('一句话描述（英文）', 'methodSummary', m.summary, 'A framework that analyzes brand strategy through four dimensions...') +
        formTextarea('核心要点（英文，每行一条）', 'methodPoints', isNew ? '' : (m.points || []).join('\n'), 'Product: Define the core offering and differentiation...\nPrice: Set pricing to reflect positioning...') +
        '<div class="form-actions">' +
          '<button class="btn btn-primary" onclick="PageCustom.saveMethod(\'' + (isNew ? 'new' : state.editingMethod) + '\')">保存</button>' +
          '<button class="btn btn-secondary" onclick="PageCustom.cancelEdit()">取消</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderMethodCard(m, i) {
    return '<div class="custom-card">' +
      '<div class="card-title">' + (m.title || '（未命名）') + '</div>' +
      (m.summary ? '<div class="card-scenario">' + m.summary + '</div>' : '') +
      (m.points && m.points.length > 0 ?
        '<ul class="card-points">' + m.points.slice(0, 3).map(function (p) {
          return '<li>' + p + '</li>';
        }).join('') + (m.points.length > 3 ? '<li>...</li>' : '') + '</ul>' : '') +
      '<div class="card-actions">' +
        '<button class="btn btn-secondary btn-sm" onclick="PageCustom.editMethod(' + i + ')">编辑</button>' +
        '<button class="btn btn-danger btn-sm" onclick="PageCustom.deleteMethod(' + i + ')">删除</button>' +
        '<button class="btn btn-secondary btn-sm" onclick="PageCustom.playMethod(' + i + ')">▶ 朗读</button>' +
      '</div>' +
    '</div>';
  }

  function formField(label, id, value, placeholder) {
    return '<div class="form-field">' +
      '<label class="form-label">' + label + '</label>' +
      '<input type="text" id="' + id + '" class="form-input" value="' + (value || '').replace(/"/g, '&quot;') + '" placeholder="' + placeholder + '">' +
    '</div>';
  }

  function formTextarea(label, id, value, placeholder) {
    return '<div class="form-field">' +
      '<label class="form-label">' + label + '</label>' +
      '<textarea id="' + id + '" class="form-textarea" rows="4" placeholder="' + placeholder + '">' + (value || '') + '</textarea>' +
    '</div>';
  }

  function switchTab(tab) {
    state.tab = tab;
    state.editingCase = null;
    state.editingMethod = null;
    var el = document.getElementById('custom-tab-content');
    if (el) el.innerHTML = renderTab();
    document.querySelectorAll('.tab-btn[data-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
  }

  function newCase() {
    state.editingCase = 'new';
    refreshTab();
  }

  function editCase(i) {
    state.editingCase = i;
    refreshTab();
  }

  function saveCase(idx) {
    var data = AppStorage.getAll();
    if (!data.customContent) data.customContent = { cases: [], methodologies: [] };
    if (!data.customContent.cases) data.customContent.cases = [];

    var entry = {
      title: (document.getElementById('caseTitle') || {}).value || '',
      scenario: (document.getElementById('caseScenario') || {}).value || '',
      situation: (document.getElementById('caseSituation') || {}).value || '',
      task: (document.getElementById('caseTask') || {}).value || '',
      action: (document.getElementById('caseAction') || {}).value || '',
      result: (document.getElementById('caseResult') || {}).value || '',
      keywords: ((document.getElementById('caseKeywords') || {}).value || '').split(',').map(function (k) { return k.trim(); }).filter(Boolean),
      createdAt: new Date().toISOString()
    };

    if (idx === 'new') {
      data.customContent.cases.push(entry);
    } else {
      data.customContent.cases[idx] = entry;
    }
    AppStorage.saveAll(data);
    state.editingCase = null;
    App.showToast('案例已保存', 'success');
    refreshTab();
  }

  function deleteCase(i) {
    if (!confirm('确定要删除这个案例吗？')) return;
    var data = AppStorage.getAll();
    data.customContent.cases.splice(i, 1);
    AppStorage.saveAll(data);
    refreshTab();
  }

  function playCase(i) {
    var data = AppStorage.getAll();
    var c = data.customContent.cases[i];
    if (!c) return;
    var text = (c.scenario || '') + ' ' + (c.situation || '') + ' ' + (c.action || '') + ' ' + (c.result || '');
    AppTTS.speak(text.trim());
  }

  function newMethod() {
    state.editingMethod = 'new';
    refreshTab();
  }

  function editMethod(i) {
    state.editingMethod = i;
    refreshTab();
  }

  function saveMethod(idx) {
    var data = AppStorage.getAll();
    if (!data.customContent) data.customContent = { cases: [], methodologies: [] };
    if (!data.customContent.methodologies) data.customContent.methodologies = [];

    var entry = {
      title: (document.getElementById('methodTitle') || {}).value || '',
      summary: (document.getElementById('methodSummary') || {}).value || '',
      points: ((document.getElementById('methodPoints') || {}).value || '').split('\n').map(function (p) { return p.trim(); }).filter(Boolean),
      createdAt: new Date().toISOString()
    };

    if (idx === 'new') {
      data.customContent.methodologies.push(entry);
    } else {
      data.customContent.methodologies[idx] = entry;
    }
    AppStorage.saveAll(data);
    state.editingMethod = null;
    App.showToast('方法论已保存', 'success');
    refreshTab();
  }

  function deleteMethod(i) {
    if (!confirm('确定要删除这个方法论要点吗？')) return;
    var data = AppStorage.getAll();
    data.customContent.methodologies.splice(i, 1);
    AppStorage.saveAll(data);
    refreshTab();
  }

  function playMethod(i) {
    var data = AppStorage.getAll();
    var m = data.customContent.methodologies[i];
    if (!m) return;
    var text = (m.summary || '') + ' ' + (m.points || []).join(' ');
    AppTTS.speak(text.trim());
  }

  function cancelEdit() {
    state.editingCase = null;
    state.editingMethod = null;
    refreshTab();
  }

  function refreshTab() {
    var el = document.getElementById('custom-tab-content');
    if (el) el.innerHTML = renderTab();
  }

  return {
    render: render,
    switchTab: switchTab,
    newCase: newCase,
    editCase: editCase,
    saveCase: saveCase,
    deleteCase: deleteCase,
    playCase: playCase,
    newMethod: newMethod,
    editMethod: editMethod,
    saveMethod: saveMethod,
    deleteMethod: deleteMethod,
    playMethod: playMethod,
    cancelEdit: cancelEdit
  };
})();
