const generateSrcSet = ( sizes ) => {
	if ( ! sizes ) {
		return '';
	}

	return Object.values( sizes )
		.map( ( size ) => {
			const imageUrl = size?.url;
			const imageWidth = size?.width;
			const imageHeight = size?.height;

			if ( ! imageUrl || ! imageWidth || ! imageHeight ) {
				return null;
			}
			return `${ imageUrl } ${ imageWidth }w ${ imageHeight }h`;
		} )
		.filter( Boolean )
		.join( ', ' );
};

export default generateSrcSet;
