/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// Scroll to top of page on navigation
exports.shouldUpdateScroll = () => {
  window.scrollTo(0, 0);
  return false;
};
