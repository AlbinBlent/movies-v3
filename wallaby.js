module.exports = function (wallaby) {
    wallaby.defaults.files.instrument = false;
    return {
        files: [
            //'ProjectName/thirdPartyLibraries/file1.js',
            //'ProjectName/thirdPartyLibraries/file2.js',
            //'ProjectName/thirdPartyLibraries/file3.js',
            { pattern: 'src/main/webapp/*.ts', instrument: true }
        ],

        tests: [{ pattern: 'src/test/webapp/*.ts', instrument: true }],

        testFramework: 'jasmine',
    };
};