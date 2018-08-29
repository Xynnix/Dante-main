var request = require("request");
/* Demo:
Tags: M/M
Rating: E
Agent: Dantè (by Darkmane on e621)
*/
function random(tags, rating, limit, callback) {
  var blockedtags = new Set(['father_and_son', 'young', 'cub', 'bestiality', 'human', 'r34', 'mlp', 'my_little_pony']);
  var tgs = tags.split(' ');
  tgs.forEach(function (tag){
    if (blockedtags.has(tag)){
      blocked = true;
    }
  });
  if(blocked)
  {
    var post = false;
    callback(post);
  }
  request.get({
    "method" : "GET",
    "uri": "https://e621.net/post/index.json?tags=" + tags + "%20order:random+rating:" + rating +"&limit=" + limit,
    "followRedirect":false,
    "headers": {
      'User-Agent': 'E621APIWrapper/1.0 (by Darkmane on e621)'
    }
  },function (err, res, body) {
    var post = JSON.parse(body);
    var ts = post[0]['tags'];
    var blocked = false;
    blockedtags.forEach(function (tag){
      if (ts.includes(tag)){
        blocked = true;
      }
    });
    if (blocked) {
      console.log('contains blocked tag -- getting new image.');
      random(tags, rating, limit, callback);
    } else {
      callback(post);
    }
  });

}

module.exports = {
  random: random
}
