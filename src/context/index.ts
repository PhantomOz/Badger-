"use server";
import fs from "fs";
import fsPromises from "fs/promises";
import { spawn } from "child_process";

export async function compile(contract: string, name: string) {
  (async function main() {
    try {
      await fsPromises.writeFile(
        "src/contract_deployer/contracts/Lock.sol",
        contract
      );

      console.log("File written successfully");
      console.log("The written file has" + " the following contents:");

      console.log(
        "" + fs.readFileSync("src/contract_deployer/contracts/Lock.sol")
      );
    } catch (err) {
      console.error(err);
    }
  })();

  const child = spawn("cd src/contract_deployer && npx hardhat compile", {
    stdio: "inherit",
    shell: true,
  });

  return new Promise<string>((resolve, reject) => {
    child.on("exit", function (code, signal) {
      if (code === 0) {
        try {
          let compiledContract = fs.readFileSync(
            `src/contract_deployer/artifacts/contracts/Lock.sol/${name}.json`,
            "utf8"
          );
          resolve(compiledContract);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(
          new Error(
            `child process exited with code ${code} and signal ${signal}`
          )
        );
      }
    });
  });
}
