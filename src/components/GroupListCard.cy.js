import React from 'react';
import { mount } from '@cypress/react';
import GroupListCard from './GroupListCard.js';

describe('GroupListCard', () => {
  it('GroupListCard', () => {
    const imgUrl =
      'https://s3-alpha-sig.figma.com/img/0451/a72a/6f78dcdda772509f036793c2ac69f4da?Expires=1635724800&Signature=RGSegBcRh-F0iqOUip3acYgaJ-~j3Rysye5T22y0j7pmQu2j12KSsrIlynAADAg0puktxn7qMZ~t9KJ7UGPC1qPOrDFVxU8PRcWHzjskHPzC4T6pxZlYsT5VUOEbi2ZNyKX5ZJUFnF1lLg4KzEIUQzgQhoAdEraMU7ZS~K5LncCQmcnB1tGIXLTBfxEqgHK2iGpoff4NZpEgW-SPFul7QOfn1YUgEjL1bY33dr-d~RSUCNHfIji3rh1fkte4Wu8TEW4WNZHxFrBWo5zzjj6p5-~BXi8ojZB5GsXmV9~MmvdHXF4W522ZyQGYX6iHuLaUbUAW9wPa~thul7s3V1o-NA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
    const country = {
      countryName: 'Africa',
      tokens: '510',
      imgList: [
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
        imgUrl,
      ],
    };
    mount(<GroupListCard country={country} />);
  });
});
