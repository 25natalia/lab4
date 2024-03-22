const rickymorty = async (id: number) => {
	try {
		const getData = await fetch('https://rickandmortyapi.com/api/character/' + id).then((res) => res.json());
		return getData;
	} catch (error) {
		console.log(error);
	}
};

export default rickymorty;
