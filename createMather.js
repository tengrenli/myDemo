const Regexp = require('path-to-regexp')
function normalizePath (path, parent, strict) {
  if (!strict) path = path.replace(/\/$/, '')
  if (path[0] === '/') return path
  if (parent == null) return path
  return cleanPath(`${parent.path}/${path}`)
}
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}
/**
 * RouteRegExp
 */
function compileRouteRegex (path, pathToRegexpOptions) {
  const regex = Regexp(path, [], pathToRegexpOptions)
  // if (process.env.NODE_ENV !== 'production') {
  //   const keys: any = Object.create(null)
  //   regex.keys.forEach(key => {
  //     warn(
  //       !keys[key.name],
  //       `Duplicate param keys in route with path: "${path}"`
  //     )
  //     keys[key.name] = true
  //   })
  // }
  return regex
}
function addRouteRecord (pathList, pathMap, nameMap, route, parent, matchAs) {
  const { path, name } = route

  const pathToRegexpOptions = route.pathToRegexpOptions || {}
  const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }

  const record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    enteredCbs: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
        ? route.props
        : { default: route.props }
  }

  if (route.children) {
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }

  if (route.alias !== undefined) {
    const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
    for (let i = 0; i < aliases.length; ++i) {
      const alias = aliases[i]

      const aliasRoute = {
        path: alias,
        children: route.children
      }
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      )
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    }
  }
}

function createRouteMap (routes, oldPathList, oldPathMap, oldNameMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathList || Object.create(null)
  const nameMap = oldNameMap || Object.create(null)
  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      // 通配符
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }
  return {
    pathList,
    pathMap,
    nameMap
  }
}

createRouteMap([{ path: '/foo', component: { template: '<div>foo</div>' } }])
