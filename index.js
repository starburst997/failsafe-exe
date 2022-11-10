import fs from 'fs';
import Path from 'path';
import archiver from 'archiver';
import {ProjectorWindows32, ProjectorMacApp, ProjectorLinux64} from '@shockpkg/swf-projector';

const opsys = process.platform;

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const zip = (dir, output) => {
	var output = fs.createWriteStream(output);
	var archive = archiver('zip');

	archive.on('error', function(err){
	    throw err;
	});

	archive.pipe(output);
	archive.directory(dir, dir.substr(dir.lastIndexOf('/') + 1));
	archive.finalize();
}

const zipFile = (file, output) => {
	var output = fs.createWriteStream(output);
	var archive = archiver('zip');

	archive.on('error', function(err){
	    throw err;
	});

	archive.pipe(output);
	archive.file(file, {name: file.substr(file.lastIndexOf('/') + 1)});
	archive.finalize();
}

const tarFile = (file, output) => {
	var output = fs.createWriteStream(output);
	var archive = archiver('tar', {gzip: true});

	archive.on('error', function(err){
	    throw err;
	});

	archive.pipe(output);
	archive.file(file, {name: file.substr(file.lastIndexOf('/') + 1)});
	archive.finalize();
}

// Windows
const WindowsSiftHeads = async () => {
	const projector = new ProjectorWindows32('output/windows/SiftHeadsSW.exe');

	projector.iconFile = 'icon/icon.ico';
	projector.patchWindowTitle = 'Sift Heads';
	projector.removeCodeSignature = true;
	projector.versionStrings = {
		FileVersion: '1.0.0',
		ProductVersion: '1.0.0',
		CompanyName: 'FailSafe Games',
		FileDescription: 'Sift Heads - Street Wars',
		LegalCopyright: 'Copyright 2012 FailSafe Games',
		ProductName: 'Sift Heads - Street Wars',
		OriginalFilename: 'SiftHeadsSW.exe',
		InternalName: 'Sift Heads - Street Wars'
	};

	await projector.withFile('projector/flashplayer_32.exe', 'swf/shsw.swf');
	fs.renameSync('output/windows/SiftHeadsSW.exe', 'output/windows/SiftHeadsSW_32.exe');
	zipFile('output/windows/SiftHeadsSW_32.exe', 'output/windows/SiftHeadsSW_32.zip');

	await projector.withFile('projector/flashplayer_64.exe', 'swf/shsw.swf');
	zipFile('output/windows/SiftHeadsSW.exe', 'output/windows/SiftHeadsSW.zip');
}

const WindowsTerminal = async () => {
	const projector = new ProjectorWindows32('output/windows/TheTerminal.exe');

	projector.iconFile = 'icon/icon.ico';
	projector.patchWindowTitle = 'The Terminal';
	projector.removeCodeSignature = true;
	projector.versionStrings = {
		FileVersion: '1.0.0',
		ProductVersion: '1.0.0',
		CompanyName: 'FailSafe Games',
		FileDescription: 'The Terminal',
		LegalCopyright: 'Copyright 2010 FailSafe Games',
		ProductName: 'The Terminal',
		OriginalFilename: 'TheTerminal.exe',
		InternalName: 'The Terminal'
	};

	await projector.withFile('projector/flashplayer_32.exe', 'swf/terminal.swf');
	fs.renameSync('output/windows/TheTerminal.exe', 'output/windows/TheTerminal_32.exe');
	zipFile('output/windows/TheTerminal_32.exe', 'output/windows/TheTerminal_32.zip');

	await projector.withFile('projector/flashplayer_64.exe', 'swf/terminal.swf');
	zipFile('output/windows/TheTerminal.exe', 'output/windows/TheTerminal.zip');
}

const WindowsBobsicle = async () => {
	const projector = new ProjectorWindows32('output/windows/Bobsicle.exe');

	projector.iconFile = 'icon/icon.ico';
	projector.patchWindowTitle = 'Bobsicle';
	projector.removeCodeSignature = true;
	projector.versionStrings = {
		FileVersion: '1.0.0',
		ProductVersion: '1.0.0',
		CompanyName: 'FailSafe Games',
		FileDescription: 'Bobsicle',
		LegalCopyright: 'Copyright 2009 FailSafe Games',
		ProductName: 'Bobsicle',
		OriginalFilename: 'Bobsicle.exe',
		InternalName: 'Bobsicle'
	};

	await projector.withFile('projector/flashplayer_32.exe', 'swf/bobsicle.swf');
	fs.renameSync('output/windows/Bobsicle.exe', 'output/windows/Bobsicle_32.exe');
	zipFile('output/windows/Bobsicle_32.exe', 'output/windows/Bobsicle_32.zip');
	
	await projector.withFile('projector/flashplayer_64.exe', 'swf/Bobsicle.swf');
	zipFile('output/windows/Bobsicle.exe', 'output/windows/Bobsicle.zip');
}

// Mac
const MacSiftHeads = async () => {
	const projector = new ProjectorMacApp('output/mac/SiftHeadsSW.app');
	projector.iconFile = 'icon/icon.icns';
	projector.binaryName = 'SiftHeadsSW';
	//projector.infoPlistFile = 'Info.plist';
	//projector.pkgInfoFile = 'PkgInfo';
	projector.bundleName = 'SiftHeadsSW';
	projector.patchWindowTitle = 'Sift Heads';
	projector.removeFileAssociations = true;
	projector.removeInfoPlistStrings = true;
	projector.removeCodeSignature = true;

	await projector.withFile('projector/flashplayer_32_sa.dmg', 'swf/shsw.swf');

	zip('output/mac/SiftHeadsSW.app', 'output/mac/SiftHeadsSW.app.zip');
}

const MacTerminal = async () => {
	const projector = new ProjectorMacApp('output/mac/TheTerminal.app');
	projector.iconFile = 'icon/icon.icns';
	projector.binaryName = 'TheTerminal';
	//projector.infoPlistFile = 'Info.plist';
	//projector.pkgInfoFile = 'PkgInfo';
	projector.bundleName = 'TheTerminal';
	projector.patchWindowTitle = 'The Terminal';
	projector.removeFileAssociations = true;
	projector.removeInfoPlistStrings = true;
	projector.removeCodeSignature = true;

	await projector.withFile('projector/flashplayer_32_sa.dmg', 'swf/terminal.swf');

	zip('output/mac/TheTerminal.app', 'output/mac/TheTerminal.app.zip');
}

const MacBobsicle = async () => {
	const projector = new ProjectorMacApp('output/mac/Bobsicle.app');
	projector.iconFile = 'icon/icon.icns';
	projector.binaryName = 'Bobsicle';
	//projector.infoPlistFile = 'Info.plist';
	//projector.pkgInfoFile = 'PkgInfo';
	projector.bundleName = 'Bobsicle';
	projector.patchWindowTitle = 'Bobsicle';
	projector.removeFileAssociations = true;
	projector.removeInfoPlistStrings = true;
	projector.removeCodeSignature = true;

	await projector.withFile('projector/flashplayer_32_sa.dmg', 'swf/bobsicle.swf');

	zip('output/mac/Bobsicle.app', 'output/mac/Bobsicle.app.zip');
}

// Linux
const LinuxSiftHeads = async () => {
	const projector = new ProjectorLinux64('output/linux/SiftHeadsSW');
	projector.patchWindowTitle = 'Sift Heads';
	projector.patchMenuRemove = true;
	projector.patchProjectorPath = true;
	projector.patchProjectorOffset = true;

	await projector.withFile('projector/flash_player_sa_linux.x86_64.tar.gz', 'swf/shsw.swf');

	fs.chmodSync('output/linux/SiftHeadsSW', 0o755);
	tarFile('output/linux/SiftHeadsSW', 'output/linux/SiftHeadsSW.tar.gz');
}

const LinuxTerminal = async () => {
	const projector = new ProjectorLinux64('output/linux/TheTerminal');
	projector.patchWindowTitle = 'The Terminal';
	projector.patchMenuRemove = true;
	projector.patchProjectorPath = true;
	projector.patchProjectorOffset = true;

	await projector.withFile('projector/flash_player_sa_linux.x86_64.tar.gz', 'swf/terminal.swf');

	fs.chmodSync('output/linux/TheTerminal', 0o755);
	tarFile('output/linux/TheTerminal', 'output/linux/TheTerminal.tar.gz');
}

const LinuxBobsicle = async () => {
	const projector = new ProjectorLinux64('output/linux/Bobsicle');
	projector.patchWindowTitle = 'Bobsicle';
	projector.patchMenuRemove = true;
	projector.patchProjectorPath = true;
	projector.patchProjectorOffset = true;

	await projector.withFile('projector/flash_player_sa_linux.x86_64.tar.gz', 'swf/bobsicle.swf');

	fs.chmodSync('output/linux/Bobsicle', 0o755);
	tarFile('output/linux/Bobsicle', 'output/linux/Bobsicle.tar.gz');
}

// Cleanup
deleteFolderRecursive("output");
fs.mkdirSync("output");
fs.mkdirSync("output/windows");
fs.mkdirSync("output/mac");
fs.mkdirSync("output/linux");

// Execute
async function Execute() {
	await WindowsSiftHeads();
	await WindowsTerminal();
	await WindowsBobsicle();

	if (opsys == "darwin") {
		await MacSiftHeads();
		await MacTerminal();
		await MacBobsicle();
	}

	await LinuxSiftHeads();
	await LinuxTerminal();
	await LinuxBobsicle();
}

Execute();