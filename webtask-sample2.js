var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var urlLib     = require('url');
var app = express();

var _dbug = false;

function dbug(s) { if (_dbug) { return ("\n_dbug: " + new Date() + ": [<" + s + "\n>]\n"); } else return "";}

app.use(function(req, res, next) {
  _dbug = req.query.debug ? true : false;
  // This function strips two parameters used by webtask.io from the req.query object, and both the parsed URL and the originalUrl: webtask_no_cache, and "_"
  // NOTE: The location of this function is important: this function must come before the app.use(bodyParser.json()) function 
  // because, otherwise by this time in the routing of the app in Express, the query object has been parsed by bodyParser.json()
  delete req.query.webtask_no_cache;
  delete req.query._;
  // req.query.newParm = "x";
  req.originalUrl = req.originalUrl.replace(/&*webtask_no_cache=1&_=\d+/,"");
  req.url = req.url.replace(/&*webtask_no_cache=1&_=\d+/,"");

  next();
});

// see NOTE: above
app.use(bodyParser.json());

// One note of caution: the returned URLs from the sample code may not be correct due to improper URL-rewriting. 
// So that's still TBD, but probably won't get done.
function trySomething (req, res) {
  res.write("Try something like 'https://" + req.host + (req.port ? (":" + req.port) : "") + req.originalUrl + "/test?name=Alice[&debug[=true]]' to see what happens.\n");
  if (_dbug) res.write(dbug("\nThis is what the parsed URL contains: " + JSON.stringify(urlLib.parse(req.originalUrl))));
  if (_dbug) res.write(dbug("\nThis is what req.query object contains: " + JSON.stringify(req.query)));
}

app.get('/', function (req, res) {
  trySomething(req, res);
  res.sendStatus(200);
});

app.get('/test', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.write("<html><body>");
  res.write("<h1>" + (req.query.name ? ("<b>" + req.query.name + "</b>, ") : "<i>Sorry</i>, ") + "I still haven't found what you're looking for.\n<br/></h1>");
  res.write("<h2>Your original url was: <a href=https://" + req.host + (req.port ? (":" + req.port) : "") + req.originalUrl + ">" + req.url + "</a></h2>");
  if (_dbug) res.write("<pre>");
  trySomething(req,res);
  if (_dbug) res.write("</pre>");
  res.write("</body></html>");
  res.sendStatus(200);
});

module.exports = Webtask.fromExpress(app);
