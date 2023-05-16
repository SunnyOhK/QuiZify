const previewTrackUrls = (context, options) => {
  if (context && context.length > 0) {
    return options.fn(context[0]);
  }
  return '';
}

module.exports = {
  previewTrackUrls,
}