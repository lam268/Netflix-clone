const lunr = require("lunr")

const posts = [
	{
		name: "Starwar",
		description:
			"Star Wars is an American epic space opera[1] media franchise created by George Lucas, which began with the eponymous 1977 film[b] and quickly became a worldwide pop-culture phenomenon.",
	},
	{
		name: "JungleBook",
		description:
			"The Jungle Book is a 2016 American fantasy adventure film directed and produced by Jon Favreau, written by Justin Marks and produced by Walt Disney Pictures. ",
	},
	{
		name: "WonderWoman",
		description:
			"When a sta pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
	},
]

var index;
createIndex();
function createIndex() {
	index = lunr(function () {
	    this.field('name', {boost: 10})
        this.field('description')

        for (let i = 0; i < posts.length; i++) {
            this.add(posts[i])
        }
  });	
}

const result = idx.search("sta")
console.log(result)

function searchMovie(query) {
	const result = idx.search(query)

	return result.map((item) => {
		return posts.find((post) => item.ref === post.id)
	})
}
result = searchPosts("JungleBook")
console.log(result)
