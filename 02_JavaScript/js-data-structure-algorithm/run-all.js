// รันไฟล์ตัวอย่างทั้งหมดตามลำดับ เพื่อเช็กว่าไม่มี Error
//   node run-all.js                       -> รันทุกหมวด
//   node run-all.js 01-algorithm          -> รันเฉพาะหมวดที่ระบุ

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = __dirname;
const filter = process.argv[2];

// ไล่หาไฟล์ที่ต้องรัน: ไฟล์เลขนำหน้าในหมวด algorithm และ demo.js ในโฟลเดอร์ย่อย
function collect(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collect(full));
    } else if (/^\d{2}-.*\.js$/.test(entry.name) || entry.name === "demo.js") {
      files.push(full);
    }
  }
  return files;
}

const sections = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .filter((d) => !filter || d.name === filter)
  .map((d) => d.name)
  .sort();

let failed = 0;
for (const section of sections) {
  for (const file of collect(path.join(root, section))) {
    const rel = path.relative(root, file);
    console.log(`\n===== ${rel} =====`);
    const result = spawnSync(process.execPath, [file], { stdio: "inherit", cwd: path.dirname(file) });
    if (result.status !== 0) {
      failed++;
      console.error(`!! ${rel} ทำงานผิดพลาด`);
    }
  }
}

console.log(failed === 0 ? "\nรันครบทุกไฟล์ ไม่มี Error" : `\nมี ${failed} ไฟล์ที่ผิดพลาด`);
process.exit(failed === 0 ? 0 : 1);
