(() => {
  'use strict';
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    event.record.重複禁止項目.disabled = true;
    return event;
  });
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], async (event) => {
    const Ban = event.record.重複禁止項目.value;
    const params = {
      'app': kintone.app.getId(),
      'fields': '重複禁止項目',
      'query': `重複禁止項目 = "${Ban}"`
    };
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params);
    const Banfield = resp.records;
    if (Banfield.length !== 0) {
      const result = confirm('レコードが重複しています。このまま保存しますか？');
      if (result) {
        return event;
      } else {
        return false;
      }
    }
  });
})();