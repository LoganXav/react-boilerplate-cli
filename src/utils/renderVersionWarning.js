// import { execSync } from "child_process";
// import https from "https";

// function checkForLatestVersion(){
//     return new Promise((resolve, reject) => {
//       https
//         .get(
//           "https://registry.npmjs.org/-/package/create-t3-app/dist-tags",
//           (res) => {
//             if (res.statusCode === 200) {
//               let body = "";
//               res.on("data", (data) => (body += data));
//               res.on("end", () => {
//                 resolve((JSON.parse(body)).latest);
//               });
//             } else {
//               reject();
//             }
//           }
//         )
//         .on("error", () => {
//           // logger.error("Unable to check for latest version.");
//           reject();
//         });
//     });
//   }

// export const getNpmVersion = () =>
//   // `fetch` to the registry is faster than `npm view` so we try that first
//   checkForLatestVersion().catch(() => {
//     try {
//       return execSync("npm view create-t3-app version").toString().trim();
//     } catch {
//       return null;
//     }
//   });
