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
                    // Exclude macOS system files
                    if (entry.name.includes('.DS_Store')) {
                        return false;
                    }
                    // Exclude empty/dummy admin JS files generated as side-effect of compiling SCSS
                    if (entry.name.includes('admin/js') || (entry.name.includes('admin') && entry.name.endsWith('.js'))) {
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
