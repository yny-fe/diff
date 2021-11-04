/*
* @Author: Just be free
* @Date:   2021-11-01 11:05:46
* @Last Modified by:   Just be free
* @Last Modified time: 2021-11-03 13:40:59
* @E-mail: justbefree@126.com
*/
const fs = require("fs");
const readline = require('readline');
const util = require("util");
const moment = require("moment");

const { exec } = require("./getCommit.js");
const { listCommit } = require("./listCommit.js");
const { getDiff } = require("./getDiff.js");

async function loopListCommit(t1, t2, index = 1, result = []) {
  const r = await listCommit(t1, t2, index, projectNo);
  if (r.length === 0) {
    return result;
  } else {
    result.push(...r);
    return await loopListCommit(t1, t2, index + 1, result);
  }
}
function hasRecord(target, item, attr) {
  return target.filter(t => t.file === item[attr]).length > 0;
}
async function processingFiles(commitLists = []) {
  const caculated = [];

  const loop = async (commits) => {
    const commit = commits.shift();
    const diff = await getDiff(commit.id, projectNo);
    if (diff && Array.isArray(diff)) {
      diff.forEach(d => {
        let status = "";
        if (!d.new_file && !d.deleted_file) {
          status = "modifed";
        } else if (d.new_file) {
          status = "added";
        } else if (d.deleted_file) {
          status = "deleted";
        }
        console.log(`${d.new_path} has been ${status}`);
        if (hasRecord(caculated, d, "new_path")) {
          const index = caculated.findIndex(c => c.file === d.new_path);
          const item = caculated[index];
          item.records.push(status);
          caculated.splice(index, 1, item);
        } else {
          caculated.push({ file: d.new_path, records: [status] })
        }
      });
    }
    if (commits.length > 0) {
      await loop(commits);
    }
  }
  await loop(commitLists);
  return caculated;
}

async function main(commit2, commit1, projectNo) {
  const c1 = await exec(commit1, projectNo);
  const c2 = await exec(commit2, projectNo);
  let t1 = moment(c1.created_at).toISOString();
  let t2 = moment(c2.created_at).toISOString();
  if (moment(t1).isAfter(moment(t2))) {
    t1 = moment(c2.created_at).toISOString();
    t2 = moment(c1.created_at).toISOString();
  }
  const r = await loopListCommit(t1, t2, 1, []);
 
  const c = await processingFiles(r);
  let result = "";
  c.forEach(list => {
    result += (list.file + `\   ${list.records.pop()} \n`);
  });
  fs.writeFileSync("./detected.txt", result);
}
const commit1 = "87de3bf3abcb2a6c3305214980b90ce319432d34";
const commit2 = "631620036436c2be34e6ba088dab7fcfb0cc35db";
const projectNo = 745;
main(commit2, commit1, projectNo);


