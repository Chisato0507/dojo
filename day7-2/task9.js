(() => {
  'use strict';
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    event.record.重複禁止項目.disabled = true;
    return event;
  });
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], async (event) => {
    const Ban = event.record.重複禁止項目.value;
    let query;
    if (event.type === 'app.record.create.submit'){
      query = `重複禁止項目 = "${Ban}"`;
    } else {
      const id = kintone.app.record.getId();
      query = `$id != "${id}" and 重複禁止項目 = "${Ban}"`;
    }
    const params = {
      'app': kintone.app.getId(),
      'query': query
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