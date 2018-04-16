/**
 * Module dependencies.
 */

import * as base62 from './base62';

/**
 * Converts a GID Buffer to an ID hex string.
 * Based off of Spotify.Utils.str2hex(), modified to work with Buffers.
 */

const gid2id = function (gid) {
  for (var b = '', c = 0, a = gid.length; c < a; ++c) {
    b += (gid[c] + 256).toString(16).slice(-2);
  }
  return b;
};

/**
 * ID -> URI
 */

const id2uri = function (uriType, v) {
  var id = base62.fromHex(v, 22);
  return 'spotify:' + uriType + ':' + id;
};

/**
 * URI -> ID
 *
 * >>> SpotifyUtil.uri2id('spotify:track:6tdp8sdXrXlPV6AZZN2PE8')
 * 'd49fcea60d1f450691669b67af3bda24'
 * >>> SpotifyUtil.uri2id('spotify:user:tootallnate:playlist:0Lt5S4hGarhtZmtz7BNTeX')
 * '192803a20370c0995f271891a32da6a3'
 */

const uri2id = function (uri) {
  var parts = uri.split(':');
  var s;
  if (parts.length > 3 && 'playlist' == parts[3]) {
    s = parts[4];
  } else {
    s = parts[2];
  }
  var v = base62.toHex(s, undefined);
  return v;
};

/**
 * GID -> URI
 */

const gid2uri = function (uriType, gid) {
  var id = gid2id(gid);
  return id2uri(uriType, id);
};

/**
 * Accepts a String URI, returns the "type" of URI.
 * i.e. one of "local", "playlist", "track", etc.
 */

const uriType = function (uri) {
  var parts = uri.split(':');
  var len = parts.length;
  if (len >= 3 && 'local' == parts[1]) {
    return 'local';
  } else if (len >= 5) {
    return parts[3];
  } else if (len >= 4 && 'starred' == parts[3]) {
    return 'playlist';
  } else if (len >= 3) {
    return parts[1];
  } else {
    throw new Error('could not determine "type" for URI: ' + uri);
  }
};

const parse_url = function (url) {
  var a = document.createElement('a');
  a.href = url;
  
  return {
    source: url,
    site: [a.protocol, '//', a.hostname].join(''),
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    origin: a.protocol + '//' + a.hostname + '/' + a.pathname.replace(/^\//, ''),
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length, i = 0, s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    }()),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || ['', ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || ['', ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
};

import * as bbUtils from './bbUtils';
import { Format } from './format';

export {
  gid2id,
  id2uri,
  uri2id,
  gid2uri,
  uriType,
  parse_url,
  bbUtils,
  Format
};
