(() => {
  'use strict';
  kintone.events.on('app.record.create.show', async (event) => {
    const resp = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', {'app': kintone.app.getId(), 'lang': 'default'});
    const action5Array = resp.properties.Table.fields.Action5.options;
    const potArray = [];
    Object.keys(action5Array).forEach((val) => {
    // ソートのための処理(inudexプロパティとoption(=val)を結びつける)
      potArray[action5Array[val].index] = val;
    });
    console.log(potArray);
    const table = event.record.Table;
    table.value = [];
    potArray.forEach((elem) => {
    //   const recordApp = event.record.Table.value[0];//変数に入れる
      table.value.push({
        value: {
          'Action5': {
            type: 'DROP_DOWN',
            value: elem,
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
