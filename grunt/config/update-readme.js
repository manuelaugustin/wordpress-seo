class VersionNumber {
	constructor( versionNumberString ) {
		this.versionNumberString = versionNumberString;
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
			}


			changelog = changelog.replace( /== Changelog ==/ig, "== Changelog ==\n\n" + newChangelog );
		}
	);
};
