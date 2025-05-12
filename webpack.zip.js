const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const zip = async () => {
    const filesAndFolders = [
        'assets',
        'build',
        'includes',
        'languages',
        'vendor',
        'gslider-blocks.php',
        'changelog.txt',
        'gslider-blocks.pot',
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
                archive.directory(fullPath, item); // Add full directory
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
