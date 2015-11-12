var Markov = require('./markov').Markov;

var zlib = require('zlib'),
    fs = require('fs');
var path = require('path');


var currentMarkov;
var markovs = {};
var messages = JSON.parse(fs.readFileSync('messages.txt'));
messages.forEach(function(message) {
  currentMarkov = getMarkov(message.corpus);
  message.subject = sen2gibberish(message.subject);
  var pars = message.body.split("\n");
  var sig = pars.slice(-2);
  message.body = msg2gibberish(message.body) + '\n' + sig.join("\n");
});
fs.writeFile('messages.json', JSON.stringify(messages), 'utf-8');


function sen2gibberish(sentence) {
  var words = sentence.split(/\s+/).length;
  var start = currentMarkov.randomStart();
  var gibberish = currentMarkov.generate(start, words);
  gibberish = gibberish.replace(/\w.+/, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
  console.log("sentence: " + gibberish);
  return gibberish + ".";
}

function par2gibberish(paragraph) {
  return paragraph.split(/\./)
	.map(sen2gibberish)
	.join("   ");
}

function msg2gibberish(message) {
  return message.split("\n")
	.filter(function(s) { return s.trim().length; })
	.map(par2gibberish)
	.join("\n");
}



function getMarkov(corpus) {
  if (!markovs[corpus]) {
    markovs[corpus] = new Markov();
    var inputFile = path.join(__dirname, '/corpora/', corpus + '.txt');
    var text = fs.readFileSync(inputFile, 'utf8')
    text = text.replace(/[^\s\w.,]/g, "");
    console.log("*** Training markov corpus with " + corpus);
    markovs[corpus].train(text);
  }
  return markovs[corpus];
}

