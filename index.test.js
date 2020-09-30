test('Media Declarations', () => {
  const trekAtMedia = require('./index')();
  
  const atRule = { params: '' };
  
  atRule.params = 'palm';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (max-width: 1023px)');
  
  atRule.params = 'tablet';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1024px)');
  
  atRule.params = 'laptop';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1280px)');
  
  atRule.params = 'desktop';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1440px)');
  
  atRule.params = 'palm only';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (max-width: 1023px)');
  
  atRule.params = 'tablet only';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1024px) and (max-width: 1279px)');
  
  atRule.params = 'laptop only';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1280px) and (max-width: 1439px)');
  
  atRule.params = 'desktop only';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1440px)');
});

test('Custom Options', () => {
  const trekAtMedia = require('./index')({
    media: {
      palm: 768,
      tablet: 1024,
      laptop: 1320,
      desktop: 1440
    }
  });
  
  const atRule = { params: '' };
  
  atRule.params = 'laptop';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1320px)');
  
  atRule.params = 'tablet only';
  trekAtMedia.AtRule.media(atRule);
  expect(atRule.params).toBe('screen and (min-width: 1024px) and (max-width: 1319px)');
});