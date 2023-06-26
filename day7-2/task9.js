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
    };
    const resp = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params);
    const Banfield = resp.records;
    const BanArray = [];
    Object.keys(Banfield).forEach((val) => {
      Object.keys(Banfield[val]).forEach((elm) => {
        BanArray.push(Banfield[val][elm].value);
      });
    });
    const find = BanArray.includes(Ban);
    if (find) {
      const result = confirm('レコードが重複しています。このまま保存しますか？');
      if (result) {
        return event;
      } else {
        return false;
      }
    }
  });
})();