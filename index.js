const defaults = {
  media: {
    palm: 768,
    tablet: 1024,
    laptop: 1280,
    desktop: 1440
  }
}

function trekAtMedia(options = defaults) {
  
  function createParams(medium, only) {
    if (undefined === only) {
      if (medium === 'palm') return `screen and (max-width: ${options.media.tablet - 1}px)`;
      return `screen and (min-width: ${options.media[medium]}px)`;
    }
    switch (medium) {
      case 'palm':
        return `screen and (max-width: ${options.media.tablet - 1}px)`;
      case 'tablet':
        return `screen and (min-width: ${options.media.tablet}px) and (max-width: ${options.media.laptop - 1}px)`;
      case 'laptop':
        return `screen and (min-width: ${options.media.laptop}px) and (max-width: ${options.media.desktop - 1}px)`;
      default:
        return `screen and (min-width: ${options.media.desktop}px)`;
    }
  }
  
  return {
    postcssPlugin: 'postcss-trek-at-media',
    AtRule: {
      media: atRule => {
        const regex = /(palm|tablet|laptop|desktop)\s?(only)?/;
        if (regex.test(atRule.params)) {
          const params = atRule.params.match(regex);
          atRule.params = createParams(params[1], params[2]);
        }
      }
    }
  }
}

trekAtMedia.postcss = true;

module.exports = trekAtMedia;