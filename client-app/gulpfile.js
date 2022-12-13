const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const argv = require("yargs").argv;
const { exec } = require("child_process");
const distributionDir = path.join(__dirname, `./distribution/`);
const S3_BUCKET_NAME = `${argv.env}-hackathon-code-camp`

function renameHTML() {
  const filePromises = [];
  filePromises.push(
    new Promise((resolve, reject) => {
      const updateDir = [""];

      for (let i = 0; i < updateDir.length; i++) {
        const files = fs.readdirSync(`${distributionDir}${updateDir[i]}`);

        for (let j = 0; j < files.length; j++) {
          const file = files[j];

          if (path.extname(file) === ".html" && file != "index.html") {
            const newFileName = path.parse(file).name;

            const moveCommand = `aws s3 mv s3://${S3_BUCKET_NAME}/${updateDir[i]}${file} s3://${S3_BUCKET_NAME}/${updateDir[i]}${newFileName} --metadata-directive REPLACE --cache-control no-store,must-revalidate --content-type text/html`;
            exec(`${moveCommand}`, (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);
              if (error) reject(error);
              else resolve(file);
            });
          }
        }
      }
    })
  );
  return Promise.all(filePromises);
}

const sync = `aws s3 sync --delete ${distributionDir} s3://${S3_BUCKET_NAME}`;
const copy = `aws s3 cp ${distributionDir}\index.html s3://${S3_BUCKET_NAME}/index.html --metadata-directive REPLACE --cache-control no-store,must-revalidate --content-type text/html`;
const invalidateCache = `aws cloudfront create-invalidation --distribution-id E38VWR8FB4FKZB --paths "/*"`;

gulp.task("sync", function (cb) {
  exec(sync, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("copy", function (cb) {
  exec(copy, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("invalidateCache", function (cb) {
  exec(invalidateCache, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("deploy", gulp.series(["sync", "copy", renameHTML, "invalidateCache"]));