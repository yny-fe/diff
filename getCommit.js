/*
* @Author: Just be free
* @Date:   2021-11-01 10:58:37
* @Last Modified by:   Just be free
* @Last Modified time: 2021-11-01 11:46:25
* @E-mail: justbefree@126.com
*/
const util = require('util');
const path = require("path");
const fs = require("fs");
// const { execFile } = require('child_process');
const execFile = util.promisify(require('child_process').execFile);


fs.chmod(path.resolve('./get-commit.sh'), 0o775, (err) => {
  if (err) throw err;
  // console.log('The permissions for file "./get-projects.sh" have been changed!');
});


module.exports = {
  async exec(commit, no) {
    const { stdout, stderr } = await execFile(path.resolve("./get-commit.sh"), ["-C", commit, "-N", no], { shell: true });
    return JSON.parse(stdout);
  }
}
