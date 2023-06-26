(() => {
  'use strict';
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    event.record.重複禁止項目_文字列.disabled = true;
    return event;
  });
  const fields = [
    'app.record.create.change.日付',
    'app.record.edit.change.日付',
    'app.record.create.change.サイボウズ製品',
    'app.record.edit.change.サイボウズ製品',
    'app.record.create.change.管理番号',
    'app.record.edit.change.管理番号'
  ];
  kintone.events.on(['app.record.create.show', fields], (event) => {
    const date = event.record.日付.value;
    const datemoji = dayjs(date).format('YYYYMMDD');
    const product = event.record.サイボウズ製品.value;
    const number = event.record.管理番号.value;
    const productArray = {
      'kintone': 'KN',
      'Garoon': 'GR',
      'サイボウズ Office': 'OF',
      'Mailwise': 'MW'
    };
    const productId = productArray[product];
    event.record.重複禁止項目_文字列.value = datemoji + '-' + productId + '-' + number;
    return event;
  });
})();
