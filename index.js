require('dotenv').config();
const exec = require("child_process").execSync;
const express = require('express');
const del = require('del');
const app = express();

function buildDocumentation(){
	del.sync("./source");
	exec('svn export ' + process.env.SVN_ADDRESS + ' source --force');
	del.sync("./www");
	exec('cd source  && mkdocs build -d ../www');
}

app.get('/update/:secret', function (req, res) {
  if(req.params.secret == process.env.WEBHOOK_SECRET){
	buildDocumentation();
	res.status(200);
  }
  else
	res.status(401);
  res.end();
})

app.use(express.static('www'));

buildDocumentation();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});