const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const zip = async () => {
    const filesAndFolders = [
        'assets',
        'build',
        'includes',
        'languages',
        'src',
        'vendor',
        'composer.json',
        'package.json',
        'webpack.config.js',
        'gslider-blocks.php',
        'readme.txt'
    ];

    const output = path.resolve(__dirname, 'gslider-blocks.zip');
    const outputStream = fs.createWriteStream(output);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(outputStream);

    for (const item of filesAndFolders) {
        const fullPath = path.resolve(__dirname, item);

        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                archive.directory(fullPath, item, (entry) => {
                    const basename = path.basename(entry.name);

                    // Exclude ALL hidden files and directories (dot-files and dot-directories anywhere in path)
                    // WordPress.org Plugin Check does not allow hidden files.
                    if (entry.name.split('/').some(part => part.startsWith('.'))) {
                        return false;
                    }

                    // Exclude empty/dummy admin JS and asset side-effect files from SCSS compilation
                    const dummyAdminFiles = [
                        'block-controls.js',
                        'block-controls.asset.php',
                    ];
                    if (dummyAdminFiles.includes(basename)) {
                        return false;
                    }

                    // Exclude monorepo packages (e.g. packages/mcp-server) from release archive
                    if (entry.name.startsWith('packages') || entry.name.includes('/packages/')) {
                        return false;
                    }

                    return entry;
                });
            } else {
                archive.file(fullPath, { name: item }); // Add individual file
            }
        } else {
            console.warn(`Warning: ${item} does not exist and will not be included.`);
        }
    }

    await archive.finalize();

    console.log(`✅ Zip file created successfully: ${output}`);
};

zip();
