/*
* @Author: Just be free
* @Date:   2021-11-01 11:50:44
* @Last Modified by:   Just be free
* @Last Modified time: 2021-11-01 17:10:11
* @E-mail: justbefree@126.com
*/

const util = require('util');
const path = require("path");
const fs = require("fs");
const execFile = util.promisify(require('child_process').execFile);


fs.chmod(path.resolve('./list-commit.sh'), 0o775, (err) => {
  if (err) throw err;
  // console.log('The permissions for file "./get-projects.sh" have been changed!');
});


module.exports = {
  async listCommit(since, until, pageIndex, no) {
    const { stdout, stderr } = await execFile(path.resolve("./list-commit.sh"), ["-S", since, "-U", until, "-I", pageIndex, "-N", no], { shell: true });
    return JSON.parse(stdout);
  }
}

