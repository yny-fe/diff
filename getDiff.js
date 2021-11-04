/*
* @Author: Just be free
* @Date:   2021-10-29 18:12:00
* @Last Modified by:   Just be free
* @Last Modified time: 2021-11-02 18:07:31
* @E-mail: justbefree@126.com
*/
const util = require('util');
const path = require("path");
const fs = require("fs");
const execFile = util.promisify(require('child_process').execFile);


fs.chmod(path.resolve('./commit-diff.sh'), 0o775, (err) => {
  if (err) throw err;
  // console.log('The permissions for file "./get-projects.sh" have been changed!');
});

module.exports = {
  async getDiff(commit, projectNo) {
    const { stdout, stderr } = await execFile(path.resolve("./commit-diff.sh"), ["-C", commit, "-N", projectNo], { shell: true });
    return JSON.parse(stdout);
  }
}

// execFile(path.resolve("./commit-diff.sh"), ["-C", "8a8d733e9cc9ecfe9c25851eafaf213f9807d293", "-N", 245], { shell: true }, (error, stdout, stderr) => {
//   if (error) throw error;
//   try {
//     const result = JSON.parse(stdout);
//     console.log("结果", result);
//   } catch (err) {
//     console.log("打tag失败", err);
//   }
// });