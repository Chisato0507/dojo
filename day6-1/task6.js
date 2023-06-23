(() => {
  'use strict';
  kintone.events.on('app.record.create.show', (event) => {
    console.log(event);
    // アクション5を配列に入れる(応用が効かない版)
    const a5 = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
    const table = event.record.Table;
    table.value = [];
    a5.forEach((index) => {
    //   const recordApp = event.record.Table.value[0];//変数に入れる
      table.value.push({
        value: {
          'Action5': {
            type: 'DROP_DOWN',
            value: index,
          },

          '状況': {
            type: 'CHECK_BOX',
            value: ['未振り返り'],
          },

          '課題': {
            type: 'MULTI_LINE_TEXT',
            value: '',
          }
        }

      });
    });
    return event;
  });
})();
