class VersionNumber {
	constructor( versionNumberString ) {
		this.versionNumberString = versionNumberString;
		this.major = this.versionNumber().major;
		this.minor = this.versionNumber().minor;
		this.patch = this.versionNumber().patch;
	}
	versionNumber( ) {
		const versionNumberString = this.versionNumberString;
		const versionNumber = ( /(\d+).(\d+).?(\d+)?/g ).exec( versionNumberString );
		// return versionNumber;
		return {
			major: parseInt( versionNumber[1] ),
			minor: parseInt( versionNumber[2] ),
			patch: parseInt( versionNumber[3] ) || 0,
		}
	}
	isPatch( ) {
		return this.versionNumber().patch > 0;
	}
}
/**
 * ...
 *
 * @param {Object} grunt The grunt helper object.
 * @returns {void}
 */
module.exports = function( grunt ) {
	grunt.registerTask(
		"update-readme",
		"Prompts the user for the changelog entries and updates the readme.txt",
		function() {
			let changelog = grunt.file.read( "./readme.txt" );
			let newVersion = grunt.option('plugin-version');
			let newChangelog = grunt.option('new-changelog');
			const versionNumber = new VersionNumber( newVersion );
			if( !versionNumber.isPatch() ) {
				const releaseInChangelog = /= \d+\.\d+(\.\d+)? =/g;
				const allReleasesInChangelog = changelog.match( releaseInChangelog );
				const sanitizedVersionNumbers = allReleasesInChangelog.map( element => new VersionNumber(element.slice( 2, element.length- 2) ) );
				const highestMajor = Math.max( ...sanitizedVersionNumbers.map( sanitizedVersionNumber => sanitizedVersionNumber.major ) );
				const lowestMajor = Math.min( ...sanitizedVersionNumbers.map( sanitizedVersionNumber => sanitizedVersionNumber.major ) );
				if ( highestMajor !== lowestMajor ) {
					changelog = changelog.replace( new RegExp( "= " + lowestMajor + "(.|\\n)*= Earlier versions =" ), "= Earlier versions =" );
				} else {
					const lowestMinor = Math.min( ...sanitizedVersionNumbers.map( sanitizedVersionNumber => sanitizedVersionNumber.minor ) );
					const lowestVersion = `${lowestMajor}.${lowestMinor}`;
					changelog = changelog.replace( new RegExp( "= " + lowestVersion + "(.|\\n)*= Earlier versions =" ), "= Earlier versions =" );
				}
			}
			changelog = changelog.replace( /== Changelog ==/ig, "== Changelog ==\n\n" + newChangelog );
			// save changelog
		}
	);
};
