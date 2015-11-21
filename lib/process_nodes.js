'use strict'

var findNodes = require('./find_nodes')
var emptyString = ''

module.exports = processNodes

/**
 * Internal function to remove bound nodes and replace them with markers.
 *
 * @param {Node}
 * @param {Object}
 * @return {Node}
 */
function processNodes (node, def) {
  var keys = Object.keys(def)
  var map = findNodes(node, def)
  var i, j, k, key, mirrorNode, marker, parent

  for (i = 0, j = keys.length; i < j; i++) {
    key = keys[i]
    k = def[key]
    mirrorNode = map.get(k.node)
    parent = mirrorNode.parentNode
    marker = document.createTextNode(emptyString)
    k.marker = parent.insertBefore(marker, mirrorNode)
    parent.removeChild(mirrorNode)
  }

  return node
}