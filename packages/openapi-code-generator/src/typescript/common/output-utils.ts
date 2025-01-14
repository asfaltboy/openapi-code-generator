/**
 * @prettier
 */
import fs from "fs"
import path from "path"
import prettier from "prettier"
import {logger} from "../../core/logger"

export type CompilationUnit = {filename: string; toString: () => string}

const FILE_HEADER = `/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */
`

export async function loadPreviousResult(
  dest: string,
  unit: CompilationUnit,
): Promise<string> {
  if (!fs.existsSync(path.join(dest, unit.filename))) {
    return ""
  }
  return fs.readFileSync(path.join(dest, unit.filename), {
    encoding: "utf-8",
  })
}

export async function emitGenerationResult(
  dest: string,
  units: CompilationUnit[],
): Promise<void> {
  const outputs = units
    .filter((it) => it.toString().trim().length)
    .map((unit) => {
      return {
        filename: unit.filename,
        data: [FILE_HEADER, unit.toString()].join("\n"),
      }
    })

  logger.time("format output")

  for (const output of outputs) {
    output.data = await formatOutput(output.data)
  }

  logger.time("write output")

  for (const output of outputs) {
    await writeOutput(dest, output.filename, output.data)
  }
}

export async function formatOutput(raw: string): Promise<string> {
  try {
    return prettier.format(raw, {
      semi: false,
      arrowParens: "always",
      parser: "typescript",
    })
  } catch (err) {
    logger.error("failed to prettier", {err})
    return raw
  }
}

async function writeOutput(folder: string, filename: string, data: string) {
  fs.mkdirSync(folder, {recursive: true})
  fs.writeFileSync(path.join(folder, filename), data, {
    encoding: "utf-8",
  })
}
