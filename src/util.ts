import * as path from 'path';
import * as fs from 'mz/fs';
import config from './config';
import { PathLike } from 'mz/fs';

export function copyFile(src: PathLike, dst: PathLike) {
    return new Promise((resolve, reject) => {
        fs
            .createReadStream(src)
            .pipe(fs.createWriteStream(dst))
            .on('close', (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

export async function copyFolder(src: string, dst: string) {
    let stats = await fs.stat(dst).catch(e => undefined);
    if (stats && !stats.isDirectory()) {
        throw Error('not folder');
    }

    await fs.mkdir(dst);
    await Promise.all(
        (await fs.readdir(src)).map(async file => {
            let source = path.join(src, file);
            let target = path.join(dst, file);

            let stats = await fs.stat(source);

            if (stats.isDirectory()) {
                await copyFolder(source, target);
            } else if (stats.isFile()) {
                await copyFile(source, target);
            }
        }),
    );
}

export async function checkTemplatesFolder(context: any) {
    if (!await fs.exists(config.templatesFolderPath)) {
        await copyFolder(path.join(context.extensionPath, 'templates'), config.templatesFolderPath);
    }

    if (!await fs.exists(config.pageTemplatesFolderPath)) {
        await copyFolder(path.join(context.extensionPath, `templates${path.sep}page`), config.pageTemplatesFolderPath);
    }

    if (!await fs.exists(config.componentTemplatesFolderPath)) {
        await copyFolder(path.join(context.extensionPath, `templates${path.sep}component`), config.componentTemplatesFolderPath);
    }

    if (!await fs.exists(config.adapterTemplatesFolderPath)) {
        await copyFolder(path.join(context.extensionPath, `templates${path.sep}adapter`), config.adapterTemplatesFolderPath);
    }

    return await fs.exists(config.templatesFolderPath) &&
        await fs.exists(config.pageTemplatesFolderPath) &&
        fs.exists(config.componentTemplatesFolderPath) &&
        fs.exists(config.adapterTemplatesFolderPath);
}

export async function checkFolderIsExits(name: string) {
    return await fs.exists(name);
}

export async function generateFolderPath(name: string, type: string, uri: any) {
    let foldername = name + '_' + type;
    let pathname = '';
    let stat = await fs.stat(uri.path);
    console.log(`uri.path: ${uri.path}`);
    if (stat.isDirectory()) {
        pathname = `${uri.path}${path.sep}${foldername}`;
    } else {
        pathname = `${path.dirname(uri.path)}${path.sep}${foldername}`;
    }
    return pathname;
}
